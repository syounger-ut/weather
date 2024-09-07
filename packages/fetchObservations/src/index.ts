import 'dotenv/config';

import {
  AthenaClient,
  StartQueryExecutionCommand,
  StartQueryExecutionCommandOutput,
  StartQueryExecutionInput
} from "@aws-sdk/client-athena";
import { BucketLocationConstraint, S3Client } from "@aws-sdk/client-s3";
import { fromSSO } from "@aws-sdk/credential-provider-sso"; // ES Modules import
// const { AthenaClient, StartQueryExecutionCommand } = require("@aws-sdk/client-athena"); // CommonJS import

const REGION: BucketLocationConstraint = 'eu-west-2';

const initializeClient = async (): Promise<S3Client> => {
  const credentials = process.env.NODE_ENV !== "production" ? await fromSSO({ profile: process.env.AWS_PROFILE })(): undefined;

  return new S3Client({
    region: REGION,
    credentials,
  });
}

const queryString = `
SELECT windDirection FROM observations 
WHERE year='2024' AND day='01' AND hour < '03' AND hour > '01' 
ORDER BY windDirection DESC LIMIT 100;
`;

const queryAthena = async (): Promise<StartQueryExecutionCommandOutput> => {
  const config = await initializeClient();
  const client = new AthenaClient(config);
  const input: StartQueryExecutionInput = { // StartQueryExecutionInput
    QueryString: queryString, // required
    QueryExecutionContext: { // QueryExecutionContext
      Database: "tempest_weather",
      Catalog: "AwsDataCatalog",
    },
    ResultConfiguration: { // ResultConfiguration
      OutputLocation: "s3://weather-tempest-records/",
      EncryptionConfiguration: { // EncryptionConfiguration
        EncryptionOption: "SSE_S3", // required
      },
      AclConfiguration: { // AclConfiguration
        S3AclOption: "BUCKET_OWNER_FULL_CONTROL", // required
      },
    },
    WorkGroup: "primary",
    ResultReuseConfiguration: { // ResultReuseConfiguration
      ResultReuseByAgeConfiguration: { // ResultReuseByAgeConfiguration
        Enabled: true, // required
        MaxAgeInMinutes: 10080,
      },
    },
  };
  const command = new StartQueryExecutionCommand(input);
  return await client.send(command);
};


const handler = async (_event: unknown) => {
  const response = await queryAthena();
  console.log('response: ', response);

  return {
    statusCode: 200,
    body: { response },
  };
}

module.exports = { handler };
