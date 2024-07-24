import express from 'express'
import urlencoded from 'body-parser'
import { ListQueuesCommand, SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs'

const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true }))

const sqs = new SQSClient({
    region: 'us-east-1',
    endpoint: 'http://localhost:4566'
})

async function sendMessage() {
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

async function listMessages(){
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

app.listen(3333, () => {
    console.log(`Server running...`)
})

sendMessage()
listMessages()