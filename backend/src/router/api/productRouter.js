import { Router } from 'express'
import { handleGet, handlePost, handlePut, handleDelete } from '../../controllers/product.controller.js'
import multerMiddleware from '../../middleware/multer.js'
const upload = multerMiddleware('products', 'product')
import { apiAdminAccess, apiAdminAndPremiumAccess } from '../../middleware/authorization.js'
import passport from 'passport'

export const productRouter = Router()

//Obtener productos
productRouter.get('/:id?', handleGet)

// //Crear producto
productRouter.post('/', 
upload.single('image'),
passport.authenticate('jwt',{
    failWithError: true,
    session:false
  }), 
apiAdminAndPremiumAccess, 
handlePost)

// //Modificar producto
productRouter.put('/:id', 
upload.single('image'), 
passport.authenticate('jwt',{
    failWithError: true,
    session:false
  }),
apiAdminAndPremiumAccess, 
handlePut)

// //Eliminar producto
productRouter.delete('/:id', 
passport.authenticate('jwt',{
    failWithError: true,
    session:false
  }),
apiAdminAndPremiumAccess, 
handleDelete)
