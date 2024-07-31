import { config } from 'dotenv'
config()

import { SQSClient, ReceiveMessageCommand } from "@aws-sdk/client-sqs";
import { SQSClientInstance } from './lib/sqs-client.js'

export const consumerMessage = async (app) => {
    await app.get('/messages', async (request, response) => {
        const input = {
            QueueUrl: process.env.QUEUE_URL,
            AttributeNames: [ 
              "All" || "Policy" || "VisibilityTimeout" || "MaximumMessageSize" || "MessageRetentionPeriod" || "ApproximateNumberOfMessages" || "ApproximateNumberOfMessagesNotVisible" || "CreatedTimestamp" || "LastModifiedTimestamp" || "QueueArn" || "ApproximateNumberOfMessagesDelayed" || "DelaySeconds" || "ReceiveMessageWaitTimeSeconds" || "RedrivePolicy" || "FifoQueue" || "ContentBasedDeduplication" || "KmsMasterKeyId" || "KmsDataKeyReusePeriodSeconds" || "DeduplicationScope" || "FifoThroughputLimit" || "RedriveAllowPolicy" || "SqsManagedSseEnabled",
            ],
            MessageSystemAttributeNames: [ 
              "All" || "SenderId" || "SentTimestamp" || "ApproximateReceiveCount" || "ApproximateFirstReceiveTimestamp" || "SequenceNumber" || "MessageDeduplicationId" || "MessageGroupId" || "AWSTraceHeader" || "DeadLetterQueueSourceArn",
            ],
            MaxNumberOfMessages: 10,
          };

        const command = new ReceiveMessageCommand(input)
        
        try{
            await SQSClientInstance.send(command, (err, data) => {
                if(err)
                    return response.status(500).send({ message: 'Some error on server' })

                return response.status(200).send(data)
            })

        }catch(e){
            return response.status(500).send(e)
        }
    })
}