import 'dotenv/config';
import { Database } from '@weather/cloud-computing';
import { QueryExecutionState } from '@aws-sdk/client-athena';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const queryString = `
SELECT windDirection FROM observations 
WHERE year='2024' AND day='01' AND hour < '03' AND hour > '01' 
ORDER BY windDirection DESC LIMIT 100;
`;

const handler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const databaseService = new Database();
  const response = await databaseService.query(queryString);
  if (!response.QueryExecutionId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to execute Athena query' }),
    };
  }

  const queryState = await databaseService.waitForQuery(response.QueryExecutionId as string);
  if (queryState !== QueryExecutionState.SUCCEEDED) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process Athena query' }),
    };
  }

  const queryResults = await databaseService.getResults(response.QueryExecutionId as string);
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
}

module.exports = { handler };
