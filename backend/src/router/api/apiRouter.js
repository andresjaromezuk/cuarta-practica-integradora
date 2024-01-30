import { Router } from 'express'
import {productRouter} from './productRouter.js'
import {cartRouter} from './cartRouter.js'
import { userRouter } from './user.router.js'
import { sessionRouter } from './session.router.js'
import { errorHandler } from '../../middleware/errorHandler.js'
import { customResponses } from '../../middleware/customResponses.js'
import { ticketRouter } from './ticket.router.js'

export const apiRouter = Router()

apiRouter.use(customResponses)

apiRouter.use('/products', productRouter)

apiRouter.use('/carts', cartRouter)

apiRouter.use('/users', userRouter)
apiRouter.use('/sessions', sessionRouter)
apiRouter.use('/tickets', ticketRouter)

apiRouter.use(errorHandler)