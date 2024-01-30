import { Router } from 'express'
import { appendJwt } from '../../middleware/authentication.js'
import { customResponses } from '../../middleware/customResponses.js'
import { chatRouter } from './chat.router.js'
import { sessionRouter } from './session.router.js'

export const webRouter = Router()
webRouter.use(customResponses)
webRouter.use(sessionRouter)
webRouter.use(chatRouter)

webRouter.use(function(error, req, res, next){
    if (error.message.includes('sesión')){
        res.redirect('/login')
    }
})