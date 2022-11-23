const fs = require("fs")
const path = require("path")
const cors = require('cors')
const jsonServer = require("json-server")


const whitelist = ["http://localhost:3000", "https://istarck.netlify.app", "https://istarck.ru"]
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const router = jsonServer.router(path.resolve(__dirname, "db.json"))

server.use(middlewares)
server.use(jsonServer.bodyParser)


// Эндпоинт для логина
server.post("/login", (req, res) => {
    try {
        const {username, password} = req.body
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"))
        const {users = [] } = db

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        )

        if (userFromBd) {
            return res.json(userFromBd)
        }

        return res.status(403).json({message: "User not found"})
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: e.message})
    }
})

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({message: "AUTH ERROR"})
    }

    next()
})

server.use(router)

// запуск сервера
server.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
})
