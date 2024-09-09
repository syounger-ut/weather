import {
  BucketLocationConstraint,
  CreateBucketCommand,
  CreateBucketCommandInput,
  CreateBucketCommandOutput,
  HeadBucketCommand,
  HeadBucketCommandOutput,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3Client,
} from "@aws-sdk/client-s3";
import { fromSSO } from "@aws-sdk/credential-provider-sso";

const REGION: BucketLocationConstraint = 'eu-west-2';

export class Storage {
  private readonly client: Promise<S3Client>;

  public constructor() {
    this.client = this.initializeClient();
  }

  public async createObject(bucket: string, fileName: string, body: string): Promise<PutObjectCommandOutput> {
    const client = await this.client;
    const input: PutObjectCommandInput = {
      Body: body,
      Bucket: bucket,
      Key: fileName,
      ContentType: 'application/json',
    }

    const command = new PutObjectCommand(input);

    return await client.send(command);
  }

  public async createDirectory(name: string, region?: BucketLocationConstraint): Promise<CreateBucketCommandOutput> {
    const client = await this.client;

    const input: CreateBucketCommandInput = {
      ACL: 'private',
      Bucket: name,
      CreateBucketConfiguration: {
        LocationConstraint: region,
      },
    };
    const command = new CreateBucketCommand(input);
    console.debug('creating bucket: ', name);

    return await client.send(command);
  }

  public async directoryExists(name: string): Promise<HeadBucketCommandOutput> {
    const client = await this.client;
    const input = {
      Bucket: name,
    };
    const command = new HeadBucketCommand(input);
    return await client.send(command);
  }

  private async initializeClient(): Promise<S3Client> {
    const credentials = process.env.NODE_ENV !== "production" ? await fromSSO({ profile: process.env.AWS_PROFILE })(): undefined;

    return new S3Client({
      region: REGION,
      credentials,
    });
  }
}
