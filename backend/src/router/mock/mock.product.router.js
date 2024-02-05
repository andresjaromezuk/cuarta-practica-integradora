import { Router } from 'express'
import { handleGet } from '../../controllers/mock/mock.product.controller.js'

export const mockRouter = Router()

mockRouter.get('/mockingproducts', handleGet)