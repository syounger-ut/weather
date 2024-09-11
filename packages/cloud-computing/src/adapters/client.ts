import { S3Client } from "@aws-sdk/client-s3";
import { fromSSO } from "@aws-sdk/credential-provider-sso";

export const storageClient = async (region: string) => {
  const credentials = process.env.NODE_ENV !== "production" ? await fromSSO({ profile: process.env.AWS_PROFILE })(): undefined;

  return new S3Client({
    region,
    credentials,
  });
}
