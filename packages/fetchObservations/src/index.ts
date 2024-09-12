import 'dotenv/config';
import { Database } from '@weather/cloud-computing';
import { Row } from '@aws-sdk/client-athena';
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
      body: JSON.stringify({ error: 'Failed to execute query' }),
    };
  }

  let queryCount = 0;
  const queryLoop = async () => {
    console.log('call start');
    queryCount += 1;
    const queryStatus = await databaseService.queryStatus(response.QueryExecutionId as string);
    console.log('queryStatus: ', queryStatus);

    if (queryCount > 5 || queryStatus === 'SUCCEEDED') {
      console.log('loop complete');
      return queryStatus;
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        console.log('resolving');
        resolve(queryLoop());
      }, 500);
    });
  };

  console.log('calling loop: ', await queryLoop());
  console.log('loop complete FINAL');

  const queryResults = await databaseService.getResults(response.QueryExecutionId as string);
  console.log('queryResults: ', queryResults);
  queryResults.ResultSet?.Rows?.forEach((row: Row) => {
    console.log(row.Data);
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ response }),
  };
}

module.exports = { handler };
