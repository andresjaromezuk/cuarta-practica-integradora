import { Router } from 'express'
import { handleGet, handlePost, handlePut, handleDelete } from '../../controllers/cart.controller.js'
import passport from 'passport'
import {apiUserLogged} from '../../middleware/authorization.js'

export const cartRouter = Router()

//Crear carrito
cartRouter.post('/', handlePost)

//Obtener carrito
 cartRouter.get('/:id?', handleGet) 

 
 // //Actualizar carrito
 cartRouter.put('/:cid', handlePut)
 
 //Modificar cantidad de productos en el carrito
 cartRouter.put('/:cid/product/:pid',
 passport.authenticate('jwt',{
    failWithError: true,
    session:false
  }),
  apiUserLogged,  
 handlePut)
 
 
 //Borrar producto de carrito
 cartRouter.delete('/:cid/product/:pid', handleDelete)

// Vaciar carrito
cartRouter.delete('/:cid', handleDelete)