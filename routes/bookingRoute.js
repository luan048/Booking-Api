import { Router } from 'express'
import { BookingRepository } from '../database/bookingRepository.js'
import { BookingService } from '../services/bookingService.js'
import { BookingController } from '../controllers/bookingController.js'

import { authService } from './authRoute.js'

const bookingRoute = Router()

const bookingRepository = new BookingRepository()
const bookingService = new BookingService(bookingRepository)
const bookingController = new BookingController(bookingService)

const authRoule = {

    preHandler: (req, res, next) => {
        const token = req.headers.authorization?.replace(/^Bearer /, "")
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: token missing" })
        }

        const user = authService.verifyToken(token)
        if (!user) {
            return res.status(404).json({ message: "Unauthorized invalid token" })
        }

        req.user = user
        next()

    }
}

bookingRoute.get('/home', (req, res) => {
    res.json({ message: "Welcome to Home Page" })
})

bookingRoute.get('/api/bookings', authRoule.preHandler, (req, res) => {
    const { status, body } = bookingController.index(req)
    res.status(status).json(body)
})

bookingRoute.post('/api/bookings', authRoule.preHandler, (req, res) => {
    const { status, body } = bookingController.save(req)
    res.status(status).json(body)
})

export default bookingRoute