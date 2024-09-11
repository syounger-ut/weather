import {
  AthenaClient,
  GetQueryResultsCommand,
  GetQueryResultsInput,
  GetQueryResultsOutput,
  StartQueryExecutionCommand,
  StartQueryExecutionInput,
  StartQueryExecutionOutput
} from "@aws-sdk/client-athena";
import { databaseClient } from "./client";
import { BucketLocationConstraint } from "@aws-sdk/client-s3";

const REGION: BucketLocationConstraint = 'eu-west-2';
const OUTPUT_LOCATION = 's3://weather-tempest-records';
const DATABASE = 'tempest_weather';
const SEVEN_DAYS = 10080;

export class Database {
  private readonly client: Promise<AthenaClient>;

  public constructor() {
    this.client = databaseClient(REGION);
  }

  public async query(queryString: string): Promise<StartQueryExecutionOutput> {
    const client = await this.client;
    const input: StartQueryExecutionInput = {
      QueryString: queryString,
      QueryExecutionContext: {
        Database: DATABASE,
        Catalog: "AwsDataCatalog",
      },
      ResultConfiguration: {
        OutputLocation: OUTPUT_LOCATION,
        EncryptionConfiguration: {
          EncryptionOption: "SSE_S3",
        },
        AclConfiguration: {
          S3AclOption: "BUCKET_OWNER_FULL_CONTROL",
        },
      },
      WorkGroup: "primary",
      ResultReuseConfiguration: {
        ResultReuseByAgeConfiguration: {
          Enabled: true,
          MaxAgeInMinutes: SEVEN_DAYS,
        },
      },
    };
    const command = new StartQueryExecutionCommand(input);
    return await client.send(command);
  }

  public async getResults(queryExecutionId: string): Promise<GetQueryResultsOutput> {
    const client = await this.client;
    const input: GetQueryResultsInput = {
      QueryExecutionId: queryExecutionId,
    };
    const command = new GetQueryResultsCommand(input);
    return await client.send(command);
  }
}
