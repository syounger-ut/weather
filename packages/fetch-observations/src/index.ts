import dotEnv from 'dotenv';
import { Database } from '@weather/cloud-computing';
import { QueryExecutionState } from '@aws-sdk/client-athena';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ObservationQueries } from "./queries/observation-queries";
import { ObservationsFactory } from "./factories/observations-factory";
import { QueryStringParams, QueryStringParamValidator } from "./services/query-string-param-validator";

dotEnv.config({ path:'../../.env' });

const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const parameters = event.queryStringParameters as QueryStringParams;

  const queryStringParamValidator = new QueryStringParamValidator(parameters);
  if (!queryStringParamValidator.valid()) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: queryStringParamValidator.returnError() }),
    };
  }

  const queryString = ObservationQueries.getObservationsByDateRange(parameters);

  const databaseService = new Database();
  const response = await databaseService.query(queryString);
  if (!response.QueryExecutionId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to execute Athena query' }),
    };
  }

  const queryState = await databaseService.waitForQuery(response.QueryExecutionId);
  if (queryState !== QueryExecutionState.SUCCEEDED) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process Athena query' }),
    };
  }

  const queryResults = await databaseService
    .getResults(response.QueryExecutionId)
    .then(ObservationsFactory.build);

  if (!queryResults || !queryResults[0]) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to retrieve Athena query results' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      parameters: event.queryStringParameters,
      data: queryResults
    }),
  };
};

module.exports = { handler };
