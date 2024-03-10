//DAOS
import {productDao, cartDao} from '../dao/factory.js' 

//Services
import { productService } from './product.service.js'

//Errors
import { NotFoundError } from '../models/errors/notfound.error.js'

class CartService{

    async readOnePopulated(id){
        const cart =  await cartDao.readOnePopulated(id)
        if(!cart) throw new NotFoundError('Cart') 
        return cart
    }

    async readManyPopulated(){
        return await cartDao.readManyPopulated()
    }

    async create(data){
        return await cartDao.create(data)
    }

    async updateOne(criteria, newData){
        const cart = await cartDao.updateOne(criteria, newData)
        console.log(cart)
        if(!cart) throw new NotFoundError('Cart')
        return cart
    }

    async updateProductInCart(cid, pid){

        //Búsqueda de producto (service arroja su error)
        const item = await productService.readOne({_id: pid})
        
        const cart = await cartDao.readOne({_id: cid})
        if(!cart) throw new NotFoundError('Cart')

        let {products} = cart
        const product = products.find(item => item.product === pid)
        console.log(pid)
        
        if (!product) {
            products.push({
                product: pid,
                quantity: 1
            })
        } else {
            const [{product, quantity}] = products
            products ={
                product,
                quantity: quantity +1
            } 
        }

        const updatedCart= await cartDao.updateOne({_id:cid},{$set:{products: products}} )

        return updatedCart
    }

    async emptyCart(id){
        const cart = await cartDao.updateOne({_id:id}, {$set:{products: []}})
        return cart
    }

    async deleteProductFromCart(cid, pid){
        const product = await cartDao.updateOne({_id:cid},{$pull:{products: { product: pid }}})
        return product
    }

    async deleteOne(id){
        return await cartDao.deleteOne(id)
    }
}

export const cartService = new CartService()