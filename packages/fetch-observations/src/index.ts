import dotEnv from 'dotenv';
import { Database } from '@weather/cloud-computing';
import { QueryExecutionState } from '@aws-sdk/client-athena';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ObservationQueries } from "./queries/observation-queries";

dotEnv.config({ path:'../../.env' });

const handler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const databaseService = new Database();

  const year = _event.pathParameters?.year ;
  const month = _event.pathParameters?.month;
  const day = _event.pathParameters?.day;
  const hourMin = _event.pathParameters?.hourMin;
  const hourMax = _event.pathParameters?.hourMax;
  if (!year || !month || !day || !hourMin || !hourMax) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Missing required parameters; year: ${year}, month: ${month}, day: ${day}, hourMin: ${hourMin}, hourMax: ${hourMax}` }),
    };
  }

  const queryString = ObservationQueries.getObservationsByDateRange(
    ['windDirection'],
    { year, day, hourMin, hourMax },
  );

  console.log('queryString:', queryString);
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

  const queryResults = await databaseService.getResults(response.QueryExecutionId);
  if (!queryResults.ResultSet) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to retrieve Athena query results' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ response }),
  };
};

module.exports = { handler };
