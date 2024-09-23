import dotEnv from 'dotenv';
import { Database } from '@weather/cloud-computing';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ObservationsFactory } from "./factories/observations-factory";
import { QueryStringParams, QueryStringParamValidator } from "./services/query-string-param-validator";
import { QueryPreparation } from "./services/query-preparation";

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

  const databaseService = new Database();
  const queryPreparation = new QueryPreparation(databaseService, parameters);
  const queryPreparationValid = await queryPreparation.valid();
  if (!queryPreparationValid) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: queryPreparation.responseText() }),
    };
  }

  const queryResults = await databaseService
    .getResults(queryPreparation.queryResponse.QueryExecutionId as string)
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
