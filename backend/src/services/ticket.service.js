//DAO
import {ticketDao, userDao, productDao, cartDao} from '../dao/factory.js'

//Model
import {Ticket} from '../models/Ticket.js'

//Repository
import { ticketRepository } from '../repositories/ticket.respository.js'

//Services
import {emailService} from './email.service.js'
import {productService} from './product.service.js'
import {userService} from './user.service.js'
import {cartService} from './cart.service.js'

//Errors
import { UnprocessableEntityError } from '../models/errors/unprocessable.entity.error.js'

class TicketService{
    constructor(){}

    async discount_stock_and_set_amount(products){

        let amount = 0
        let no_stock_products = []

        for (let i = 0; i < products.length; i++) {

            //Buscamos si el producto existe
            const product = await productService.readOne({_id: products[i].product})
                       
            //Chequeamos stock y descontamos
            if (product.stock < products[i].quantity){
                no_stock_products.push(product._id)
            }else{
                product.stock -= products[i].quantity
                const updated_product = await productService.updateOne({_id: product._id},product)
                console.log("updated_product", updated_product)
                amount += product.price * products[i].quantity
            }

        }
            
        return{amount,no_stock_products}

    }

    async readOne(id){
        return await ticketDao.readOne({_id:id})
    }

    async readMany(query){
        return await ticketDao.readMany(query)
    }

    async create(body){
            let {purchaser , products} = body
            
            //Búsqueda de usuario (service arroja su error)
            const user = await userService.readOne(purchaser)
            console.log(user)
            
            //Validaciones
            if (products.length === 0) throw new UnprocessableEntityError('Product')
    
            const {amount,no_stock_products} = await this.discount_stock_and_set_amount(products)
           
            //Filtrar productos sin stock
            let products_to_ticket = []
            let products_to_cart = []
            products.forEach(item => {
                if(no_stock_products.includes(item.product)){
                    products_to_cart.push(item)
                }else{
                    products_to_ticket.push(item)
                }
            });
    
            //Crear Ticket
            const ticket = new Ticket({
                amount,
                user_id: user._id,
                products: products_to_ticket,
                purchaser: purchaser 
            })
            ticket.complete()
            const saved_ticket = await ticketRepository.save(ticket)
            
            //Envío de email
            await emailService.send(purchaser, "¡Gracias por tu compra!", 
            `Tu pedido n° ${saved_ticket.code} pronto será despachado`)

            //Actualizar carrito
            console.log(products_to_ticket)
            if(products_to_cart.length > 0){
                const cart = await cartService.updateOne({user_id: user._id }, {$set:{products: products_to_cart}})
                console.log(cart)
            }
            return saved_ticket
    }

    
}

export const ticketService = new TicketService()