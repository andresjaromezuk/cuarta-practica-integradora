import { Router } from 'express'
import { handlePost } from '../../controllers/ticket.controller.js'

export const ticketRouter = Router()

ticketRouter.post('/', handlePost)