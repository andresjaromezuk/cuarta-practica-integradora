import { cartDao } from '../dao/factory.js'
import { cartService } from '../services/cart.service.js'

export async function handleGet(req, res, next){
    try {
        let result
        if(req.params.id){
            result = await cartDao.readOnePopulated(req.params.id)
        }else{
            result = await cartDao.readManyPopulated()
        }
        return res.status(200).json({status: "Success", payload: result})
    } catch (error) {
       next(error) 
    }
}

export async function handlePost(req, res, next){
    try {
        const result = await cartDao.create({products:[]})
        return res.status(200).json({status: "Success", payload: result})
    } catch (error) {
       next(error) 
    }
}

export async function handlePut(req, res, next){
    try {
        let result
        if(req.params.pid){
            result = await cartService.updateProductInCart(req.params.cid, req.params.pid)
        }else{
            result = await cartDao.updateOne({_id: req.params.cid}, {$push:{products: req.body}})
        }
        return res.status(200).json({status: "Success", payload: result})
    } catch (error) {
       next(error) 
    }
}

export async function handleDelete(req, res, next){
    try {
        let result
        if(req.params.pid){
            result = await cartService.deleteProductFromCart(req.params.cid, req.params.pid)
        }else{
            result = await cartService.emptyCart(req.params.cid)
        }
        return res.status(200).json({status: "Success", payload: result})
    } catch (error) {
       next(error) 
    }
}