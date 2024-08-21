import { config } from 'dotenv'
config()

import { SNSClient } from '@aws-sdk/client-sns'

export const client = new SNSClient({
    endpoint: "http://localhost:4566", 
    region: "us-east-1"
});
