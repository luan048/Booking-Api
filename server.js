import express from 'express'

import bookingRoute from './routes/bookingRoute.js'
import {authRoute} from './routes/authRoute.js'

const server = express()
const port = 3000

server.use(express.json())
server.use(bookingRoute)
server.use(authRoute)

server.listen(port, () => {
    console.log(`Running in port: ${port}`)
})