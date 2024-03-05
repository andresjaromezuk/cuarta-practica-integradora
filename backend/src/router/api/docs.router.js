//Documentation
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

import __dirname from '../../util.js'

import { Router } from 'express'

export const docsRouter = Router()

//Documentation
const swaggerOptions = {
    definition: {
      openapi: '3.0.1',
      info:{
        title: 'Documentacion API',
        description: 'Ecommerce Coderhouse'
      },
    },
    apis:['./docs/**/*.yaml']
  }
  
  const specs = swaggerJsdoc(swaggerOptions)
  docsRouter.use('/', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))