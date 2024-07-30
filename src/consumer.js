import express from 'express'
import { ListQueuesCommand, SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs'
import { SQSClientInstance } from './lib/sqs-client.js'

export const consumerMessage = async (app) => {
    await app.get('/messages', async (request, response) => {
        const input = {
            QueueNamePrefix: "sqs-api-test",
            MaxResults: 10
        }

        const listMessages = new ListQueuesCommand(input)
        
        try{
            const responseSQS = await SQSClientInstance.send(listMessages, (err, data) => {
                if(err)
                    return response.status(500).send({ message: 'Some error on server' })

                return response.status(200).send(data)
            })

        }catch(e){
            return response.status(500).send(e)
        }
    })
}