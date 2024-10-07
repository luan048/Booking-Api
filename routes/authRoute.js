import { Router } from "express";

import { UserRepository } from "../database/userRepository.js";
import { AuthController } from "../controllers/authController.js";
import { AuthService } from "../services/authService.js";

const authRoute = Router()

const authRepository = new UserRepository()
const authService = new AuthService(authRepository)
const authController = new AuthController(authService)

authRoute.post('/api/auth/register', (req, res) => {
    const {status, body} = authController.register(req)
    res.status(status).json(body)
})

authRoute.post('/api/auth/login', (req, res) => {
    const {status, body} = authController.login(req)
    res.status(status).json(body)
})

export {authRoute, authService}