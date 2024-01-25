import { Router } from 'express'
import {cartManager} from '../../dao/services/cartManager.mongoose.js'
import {productManager} from '../../dao/services/productManager.mongoose.js'
import { cartController } from '../../controllers/cart.controller.js'

export const cartRouter = Router()

//Crear carrito
cartRouter.post('/', cartController.create)

//Obtener carrito
 cartRouter.get('/:cid', cartController.showCart) 

//Agregar productos al carrito
cartRouter.post('/:cid/product/:pid', cartController.addProduct)

//Borrar producto de carrito
cartRouter.delete('/:cid/product/:pid', cartController.deleteProduct)

//Actualizar carrito
cartRouter.put('/:cid', cartController.updateCart)

//Obtener todos los carritos
cartRouter.get('/', cartController.getAll)

//Modificar cantidad de productos en el carrito
cartRouter.put('/:cid/product/:pid', cartController.updateProductInCart)

// Vaciar carrito
cartRouter.delete('/:cid', cartController.delete)