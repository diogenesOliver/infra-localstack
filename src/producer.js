import { config } from 'dotenv'
config()

import express from 'express'
import { ListQueuesCommand, SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs'
import { SQSClientInstance } from './lib/sqs-client.js'

export const producerMessage = async (app) => {
    await app.post('/send', async (request, response) => {
        const { message, team, errorCode } = request.body
        
        const params = {
            MessageBody: JSON.stringify(request.body),
            QueueUrl: process.env.QUEUE_URL
        }

        const commad = new SendMessageCommand(params)

        try{
            await SQSClientInstance.send(commad, (err, data) => {
                if(err)
                    return response.status(500).send({ message: 'Some error on server' })
            
                return response.status(200).send(data)
            })
        }catch(e){
            return response.status(500).send(e)
        }
    })
}