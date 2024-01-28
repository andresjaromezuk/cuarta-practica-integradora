import { Router } from 'express'
//import {cartManager} from '../../dao/services/cartManager.mongoose.js'
//import {productManager} from '../../dao/services/productManager.mongoose.js'
//import { cartController } from '../../controllers/cart.controller.js'
import { handleGet, handlePost, handlePut, handleDelete } from '../../controllers/cart.controller.js'
export const cartRouter = Router()

//Crear carrito
cartRouter.post('/', handlePost)

//Obtener carrito
 cartRouter.get('/:id?', handleGet) 

 
 // //Actualizar carrito
 cartRouter.put('/:cid', handlePut)
 
 //Modificar cantidad de productos en el carrito
 cartRouter.put('/:cid/product/:pid', handlePut)
 
 
 //Borrar producto de carrito
 cartRouter.delete('/:cid/product/:pid', handleDelete)

// Vaciar carrito
cartRouter.delete('/:cid', handleDelete)