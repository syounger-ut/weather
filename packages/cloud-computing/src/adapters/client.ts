import { AthenaClient } from "@aws-sdk/client-athena";
import { S3Client } from "@aws-sdk/client-s3";
import { fromSSO } from "@aws-sdk/credential-provider-sso";

/*
  * Fetch the SSO credentials if not in production
  * @returns {Promise<undefined | Credentials>} The credentials to use for the client
 */
const resolveCredentials = async () => {
  if (process.env.NODE_ENV === "production") {
    return undefined;
  }

  return await fromSSO({ profile: process.env.AWS_PROFILE })();
};

/*
  * Initialize the storage client
  * @param {string} region - The region to use for the client
  * @returns {Promise<S3Client>} The storage client
 */
export const storageClient = async (region: string): Promise<S3Client> => {
  const credentials = await resolveCredentials();

  return new S3Client({
    region,
    credentials,
  });
};

/*
  * Initialize the database client
  * @param {string} region - The region to use for the client
  * @returns {Promise<AthenaClient>} The database client
 */
export const databaseClient = async (region: string): Promise<AthenaClient> => {
  const credentials = process.env.NODE_ENV !== "production" ? await fromSSO({ profile: process.env.AWS_PROFILE })(): undefined;

  return new AthenaClient({
    region,
    credentials,
  });
};
