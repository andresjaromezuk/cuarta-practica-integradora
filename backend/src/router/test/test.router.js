import { Router } from 'express'
import { handleGet } from '../../test/controllers/test.controller.js'

export const testRouter = Router()

testRouter.get('/loggerTest', handleGet)