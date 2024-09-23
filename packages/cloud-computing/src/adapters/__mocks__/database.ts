import { QueryExecutionState } from "@aws-sdk/client-athena";

export class Database {
  public query = jest.fn().mockReturnValue(new Promise((resolve) => {
    setTimeout(() => {
      resolve({ QueryExecutionId: '12345' });
    }, 100);
  }));

  public waitForQuery = jest.fn().mockReturnValue(new Promise((resolve) => {
    setTimeout(() => {
      resolve(QueryExecutionState.SUCCEEDED);
    }, 100);
  }));

  public getResults = jest.fn().mockReturnValue(new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse('{"ResultSet": {"Rows": [{"Data": [{"VarCharValue": "2020-01-01T00:00:00Z"}]}]}}'));
    }, 100);
  }));
}
