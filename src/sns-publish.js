import { PublishCommand } from "@aws-sdk/client-sns";
import { client } from './lib/sns-client.js'

export async function publishMessageOnSQS(){
    const input = {
        TopicArn: "arn:aws:sns:us-east-1:000000000000:localstack-iac-topic",
        Message: "This is a simple message from test",
    }
    
    const command = new PublishCommand(input);
    const response = await client.send(command);

    console.log(response)
}

publishMessageOnSQS()