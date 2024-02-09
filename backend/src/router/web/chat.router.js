import { Router } from 'express'
import { chatController } from '../../controllers/web/chat.controller.js'
import { apiUserLogged } from '../../middleware/authorization.js'
import passport from 'passport'
import { appendJwtAsCookie } from '../../middleware/authentication.js'
export const chatRouter = Router()


//Chat
chatRouter.get('/chat',
passport.authenticate('jwt',{
    failWithError: true,
    session:false
  }),
  apiUserLogged,
chatController.chat)