import fastify from "fastify";
import {BookingRepository} from './bookings/bookingRepository.js'
import {BookingService} from './bookings/bookingService.js'
import {BookingController} from './bookings/bookingController.js'

import {UserRepository} from './auth/userRepository.js'
import {AuthController} from './auth/authController.js'
import {AuthService} from './auth/authService.js'

const app = fastify({logger: true})

const bookingRepository = new BookingRepository()
const bookingService = new BookingService(bookingRepository)
const bookingController = new BookingController(bookingService)

const authRepository = new UserRepository()
const authService = new AuthService(authRepository)
const authController = new AuthController(authService)

app.get('/home', (req, reply) => {
    reply.send({message: "Welcome to Home Page"})
})

app.get('/api/bookings', (req, reply) => {
    const {code, body} = bookingController.index(req)
    reply.code(code).send(body)
})

app.post('/api/bookings', {preHandler: (req, reply, done) => {
    const token = req.headers.authorization?.replace(/^Bearer /, "")
    if(!token) reply.code(401).send({message: "Unauthorized: token missing"})

    
}}, (req, reply) => {
    const {code, body} = bookingController.save(req)
    reply.code(code).send(body)
})

//Auth

app.post('/api/auth/register', (req, reply) => {
    const {code, body} = authController.register(req)
    reply.code(code).send(body)
})

app.post('/api/auth/login', (req, reply) => {
    const {code, body} = authController.login(req)
    reply.code(code).send(body)
})

export default app