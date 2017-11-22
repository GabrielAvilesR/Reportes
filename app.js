import http from 'http'
import { port, ip, mongo } from './config'
import mongoose from 'mongoose'
mongoose.Promise = require('bluebird')
import express from 'express'
import habitsApi from './api'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/habits', habitsApi)
export const server = http.createServer(app)

mongoose.connect(mongo.uri, {useMongoClient:true});

setImmediate(() => {
    server.listen(port, ip, () => {
        console.log(`Habits Server Listening on http://${ip}:${port}`)
    })
})

export default app