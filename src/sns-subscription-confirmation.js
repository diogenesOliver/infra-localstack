import express from 'express'
import axios from 'axios'

const app = express()
app.use(express.json())

export const validationSubscription = async (app) => {
    await app.post('/sns', async (req, res) => {
        const messageType = req.headers['x-amz-sns-message-type'];
    
        if (messageType === 'SubscriptionConfirmation') {
            const subscribeUrl = req.body.SubscribeURL;
            console.log(`Recebido pedido de confirmação de inscrição: ${subscribeUrl}`)
        };
    
        try {
            await axios.get(subscribeUrl);
            console.log('Inscrição confirmada com sucesso!');
        } catch (error) {
            console.error('Erro ao confirmar a inscrição:', error);
        }
    
        console.log(res)
        return res.status(200)
    })
}