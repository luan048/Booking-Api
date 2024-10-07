import bcrypt from 'bcrypt'
import { User } from "../models/user.js"
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

export class AuthService {
    constructor(repository) {
        this.repository = repository
    }

    register(name, email, password) {
        const userExists = this.repository.findByEmail(email)
        if (userExists) throw new Error("This email was already user another user")

        const newUser = new User({ name, email, password })
        newUser.password = bcrypt.hashSync(newUser.password, 10) //bcrypt está criando uma senha embaralhada antes de salvar

        this.repository.save(newUser)
        return newUser
    }

    login(email, password) {
        const user = this.repository.findByEmail(email)

        if (!user) throw new Error("User not found")

        const isSamePassword = bcrypt.compareSync(password, user.password) // Está comparando o pass passado no parametro e o que está armazenado
        if (!isSamePassword) throw new Error("Wrong password!")

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.SEGREDO, { expiresIn: "1d" }) //JWT está usando TOKEN para sessão do usuário quando fizer login
        user.password = undefined // Para o password não retornar na resposta, já que, não tem necessidade
        return { token, user }
    }

    verifyToken(token) {
        const decodedToken = jwt.verify(token, process.env.SEGREDO)
        const user = this.repository.findByEmail(decodedToken.email)
        return user
    }
}