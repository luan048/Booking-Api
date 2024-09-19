import app from './app.js'

const port = 3000

const start = () => {
    try {
        app.listen({port: port})
        app.log.info(`Server running on port: ${port}`)
    }

    catch(error) {
        app.log.error(error)
        process.exit(1)
    }
}

start()