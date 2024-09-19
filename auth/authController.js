export class AuthController {
    constructor(service) {
        this.service = service
    }

    register(req) {
        const {name, email, password} = req.body

        if(!name || !email || !password) {
            return { code: 401, body: {message: "Name, email or password is undefined"} }
        }

        try {
            const user = this.service.register(name, email, password)
            return {code: 201, body: user}
        }

        catch(error) {
            return {code: 400, body: {message: error.message}}
        }
    }

    login(req) {
        const {email, password} = req.body

        if(!email || !password) {
            return { code: 401, body: {message: "Email or password is undefined"} }
        }

        try {
            const body = this.service.login(email, password)
            return {code: 200, body}
        }

        catch(error) {
            return {code: 400, body: {message: error.message}}
        }
    }
}