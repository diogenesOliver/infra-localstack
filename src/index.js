import express from 'express'
import urlencoded from 'body-parser'

import { producerMessage } from './producer.js'
import { consumerMessage } from './consumer.js'

const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true }))

app.listen(3333, () => {
    console.log(`Server running...`)
})

producerMessage(app)
consumerMessage(app)