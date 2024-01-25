import express, { json, urlencoded } from 'express'
import methodOverride from 'method-override' 
import {apiRouter} from './router/api/apiRouter.js'
import { webRouter } from './router/web/chat.router.js'
import {engine} from 'express-handlebars'
import { sessions } from './middleware/sessions.js'
import { authenticate } from './middleware/authentication.js'
import { cookies } from './middleware/cookies.js'
import {Server} from 'socket.io'
import { connectDB } from './database/mongodb.js'
import path from 'path'
import __dirname from './util.js'
import cors from 'cors'

//MongoDB
await connectDB()

//Express
import {PORT} from './config/server.config.js'
const app = express()
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

//Middlewares 
app.use('/static', express.static(path.join(__dirname, '../static')))

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(methodOverride('_method'))

app.use(sessions)
app.use(cookies)

app.engine('handlebars', engine())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

app.use(authenticate)

const server = app.listen(PORT, ()=>{console.log(`Servidor escuchando en puerto ${PORT}`)})

const ioServer = new Server(server)
app.use((req,res,next) => {
  req['io'] = ioServer
  next()
})

//Rutas
app.use('/api', apiRouter)
app.use('/', webRouter)
