import {cartDao} from '../dao/factory.js' 
import {productDao} from '../dao/factory.js' 

//Errors
import { NotFoundError } from '../models/errors/notfound.error.js'

class CartService{
    async updateProductInCart(cid, pid){

        const item = await productDao.readOne({_id: pid})
        if (!item){
            throw new NotFoundError('Product')
        }

        const cart = await cartDao.readOne({_id: cid})
        
        if (!cart){
            throw new NotFoundError('Cart')
        }

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
}

export const cartService = new CartService()