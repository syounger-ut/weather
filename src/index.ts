import 'dotenv/config';
import { request } from './utils/request';
import { routes } from './utils/routes';
import { parsePayload } from './utils/observationDevice';
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import { fromSSO } from '@aws-sdk/credential-provider-sso';


const observationsRoute = routes['/observations'];

const fetchObservation = async () => {
  const req = request(observationsRoute);
  const handleResponse = (payload: any): unknown => parsePayload(payload);
  return await req(handleResponse);
};

const fetchBuckets = async () => {
  const credentials = await fromSSO({ profile: process.env.AWS_PROFILE })();

  const client = new S3Client({
    region: 'eu-west-2',
    credentials,
  });

  const helloS3 = async () => {
    const command = new ListBucketsCommand({});

    const { Buckets } = await client.send(command);
    console.log("Buckets: ");
    console.log(Buckets?.map((bucket) => bucket.Name).join("\n"));
    return Buckets;
  };

  console.log('helloS3: ', await helloS3());
};

const handler = async (event: any) => {
  const response = await fetchObservation();
  console.log('response: ', response);

  await fetchBuckets();

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
}

module.exports = { handler };
