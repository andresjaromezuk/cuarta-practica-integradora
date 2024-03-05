import express, { json, urlencoded } from 'express'
import methodOverride from 'method-override' 

//Routers
import {apiRouter} from './router/api/apiRouter.js'
import { mockRouter } from './router/mock/mock.product.router.js'
import { webRouter } from './router/web/web.router.js'
import { testRouter } from './router/test/test.router.js'

//Logger
import {logHandler } from './middleware/log.handler.js'

//DB
import { connectDB } from './database/mongodb.js'

//Views
import {engine} from 'express-handlebars'

//Authentication
import { sessions } from './middleware/sessions.js'
import { authenticate } from './middleware/authentication.js'
import { cookies } from './middleware/cookies.js'

//Websockets
import {Server} from 'socket.io'

//API
import cors from 'cors'

//Utils
import path from 'path'
import __dirname from './util.js'

//MongoDB
await connectDB()

//Express
import {PORT} from './config/server.config.js'
const app = express()


//API
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

//Middlewares 
app.use('/static', express.static(path.join(__dirname, '../static')))

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(methodOverride('_method'))

//Logger
app.use(logHandler)

//Authentication
app.use(sessions)
app.use(cookies)
app.use(authenticate)

//Views
app.engine('handlebars', engine())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

const server = app.listen(PORT, ()=>{console.log(`Servidor escuchando en puerto ${PORT}`)})

//Websockets
const ioServer = new Server(server)
app.use((req,res,next) => {
  req['io'] = ioServer
  next()
})

//Rutas
app.use('/api', apiRouter)
app.use('/', webRouter)
app.use('/mock', mockRouter)
app.use('/test', testRouter)
