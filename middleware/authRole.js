import { UserRepository } from "../database/userRepository.js"
import { AuthService } from "../services/authService.js"

const authRepository = new UserRepository()
const authService = new AuthService(authRepository)

export const authRole = {
    preHandler: (req, res, next) => {
        const token = req.headers.authorization?.replace(/^Bearer /, "")
        if (!token) {
            return res.status(401).json({ message: "Unuthorized: token missing" })
        }

        const user = authService.verifyToken(token)
        if (!user) {
            return res.status(404).json({ message: "Unauthorized: invalid token" })
        }

        req.user = user
        next()
    }
}