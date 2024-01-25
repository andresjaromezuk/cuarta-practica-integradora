import { Router } from 'express'
import { chatController } from '../../controllers/chat.controller.js'

export const webRouter = Router()


//Chat
webRouter.get('/chat', chatController.chat)