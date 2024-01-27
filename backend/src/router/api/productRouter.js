import { Router } from 'express'
import { handleGet, handlePost, handlePut, handleDelete } from '../../controllers/product.controller.js'
import multerMiddleware from '../../middleware/multer.js'
const upload = multerMiddleware('images', 'product')

export const productRouter = Router()

//Obtener productos
productRouter.get('/:id?', handleGet)

// //Crear producto
productRouter.post('/', upload.single('image'), handlePost)

// //Modificar producto
productRouter.put('/:id', upload.single('image'), handlePut)

// //Eliminar producto
productRouter.delete('/:id', handleDelete)
