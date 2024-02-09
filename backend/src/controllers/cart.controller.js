import { cartService } from '../services/cart.service.js'

export async function handleGet(req, res, next){
    try {
        req.logger.http(`Cart - handleGet: ${req.method} en ${req.url}`)
        let result
        if(req.params.id){
            result = await cartService.readOnePopulated(req.params.id)
        }else{
            result = await cartService.readManyPopulated()
        }
        return res.status(200).json({status: "Success", payload: result})
    } catch (error) {
       next(error) 
    }
}

export async function handlePost(req, res, next){
    try {
        req.logger.http(`Cart - handlePost: ${req.method} en ${req.url}`)
        const result = await cartService.create({products:[]})
        return res.status(200).json({status: "Success", payload: result})
    } catch (error) {
       req.logger.error(`Error en cart handlePost: ${error.message}`)
       next(error) 
    }
}

export async function handlePut(req, res, next){
    try {
        let result
        req.logger.http(`Cart - handlePut: ${req.method} en ${req.url}`)
        req.logger.info(`Cart id: ${req.params.cid}`)
        if(req.params.pid){
            req.logger.info(`Product id: ${req.params.pid}`)
            result = await cartService.updateProductInCart(req.params.cid, req.params.pid)
        }else{
            req.logger.info(`Body: ${JSON.stringify(req.body)}`)
            result = await cartService.updateOne({_id: req.params.cid}, {$push:{products: req.body}})
        }
        return res.status(200).json({status: "Success", payload: result})
    } catch (error) {
       req.logger.error(`Error en cart handlePut: ${error.message}`)
       next(error) 
    }
}

export async function handleDelete(req, res, next){
    try {
        req.logger.http(`Cart - handleDelete: ${req.method} en ${req.url}`)
        req.logger.info(`Cart id: ${req.params.cid}`)
        let result
        if(req.params.pid){
            req.logger.info(`Product id: ${req.params.pid}`)
            result = await cartService.deleteProductFromCart(req.params.cid, req.params.pid)
        }else{
            result = await cartService.emptyCart(req.params.cid)
        }
        return res.status(200).json({status: "Success", payload: result})
    } catch (error) {
        req.logger.error(`Error en cart handleDelete: ${error.message}`)
       next(error) 
    }
}