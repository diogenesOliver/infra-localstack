import express from 'express'
import { ListQueuesCommand, SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs'

const sqs = new SQSClient({
    region: 'us-east-1',
    endpoint: 'http://localhost:4566'
})

export const consumerMessage = async (app) => {
    await app.get('/messages', async (request, response) => {
        const input = {
            QueueNamePrefix: "sqs-api-test",
            MaxResults: 10
        }

        const listMessages = new ListQueuesCommand(input)
        
        try{
            const responseSQS = await sqs.send(listMessages, (err, data) => {
                if(err)
                    return response.status(500).send({ message: 'Some error on server' })

                return response.status(200).send(data)
            })

        }catch(e){
            return response.status(500).send(e)
        }
    })
}