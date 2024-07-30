import { config } from "dotenv";
config()

import { SQSClient } from "@aws-sdk/client-sqs"; 

export const SQSClientInstance = new SQSClient({
    region: process.env.REGION,
    endpoint: process.env.ENDPOINT
})