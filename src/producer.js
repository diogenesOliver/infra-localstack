import express from 'express'
import { ListQueuesCommand, SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs'

const sqs = new SQSClient({
    region: 'us-east-1',
    endpoint: 'http://localhost:4566'
})

export const producerMessage = async (app) => {
    await app.post('/send', async (request, response) => {
        const { message, team, errorCode } = request.body
        
        const params = {
            MessageBody: JSON.stringify(request.body),
            QueueUrl: 'https://localhost.localstack.cloud:4566/000000000000/sqs-api-test'
        }

        const commad = new SendMessageCommand(params)
        console.log(commad)

        try{
            await sqs.send(commad, (err, data) => {
                if(err)
                    return response.status(500).send({ message: 'Some error on server' })
            
                return response.status(200).send(data)
            })
        }catch(e){
            return response.status(500).send(e)
        }
    })
}