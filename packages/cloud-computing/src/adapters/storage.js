"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const credential_provider_sso_1 = require("@aws-sdk/credential-provider-sso");
const REGION = 'eu-west-2';
class Storage {
    constructor() {
        this.client = this.initializeClient();
    }
    createObject(bucket, fileName, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.client;
            const input = {
                Body: body,
                Bucket: bucket,
                Key: fileName,
                ContentType: 'application/json',
            };
            const command = new client_s3_1.PutObjectCommand(input);
            return yield client.send(command);
        });
    }
    createDirectory(name, region) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.client;
            const input = {
                ACL: 'private',
                Bucket: name,
                CreateBucketConfiguration: {
                    LocationConstraint: region,
                },
            };
            const command = new client_s3_1.CreateBucketCommand(input);
            console.debug('creating bucket: ', name);
            return yield client.send(command);
        });
    }
    directoryExists(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.client;
            const input = {
                Bucket: name,
            };
            const command = new client_s3_1.HeadBucketCommand(input);
            return yield client.send(command);
        });
    }
    initializeClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = process.env.NODE_ENV !== "production" ? yield (0, credential_provider_sso_1.fromSSO)({ profile: process.env.AWS_PROFILE })() : undefined;
            return new client_s3_1.S3Client({
                region: REGION,
                credentials,
            });
        });
    }
}
exports.Storage = Storage;
