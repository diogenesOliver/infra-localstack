import express from 'express'
import urlencoded from 'body-parser'
import { ListQueuesCommand, SQSClient } from '@aws-sdk/client-sqs'

const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true }))

const sqs = new SQSClient({ region: 'us-east-1' })

export async function sendMessage() {
    await app.post('/send', async (request, response) => {
        const { message, team, errorCode } = request.body
        
        const params = {
            MessageBody: JSON.stringify(request.body),
            QueueUrl: 'https://localhost.localstack.cloud:4566/000000000000/sqs-api-test'
        }

        const commad = new ListQueuesCommand(params)
        console.log(commad)

        try{
            await sqs.send(commad, (err, data) => {
                if(err)
                    return response.send(500).send({ message: 'Some error on server' })
            
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