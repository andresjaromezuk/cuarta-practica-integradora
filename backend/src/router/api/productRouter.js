import { Router } from 'express'

import { productController } from '../../controllers/product.controller.js'

export const productRouter = Router()

//Obtener productos
productRouter.get('/', productController.getAll)

//Obtener producto
productRouter.get('/:id',  productController.getById)

//Crear producto
productRouter.post('/', productController.create)

//Modificar producto
productRouter.put('/:pid',  productController.update)

//Eliminar producto
productRouter.delete('/:pid',  productController.delete)
