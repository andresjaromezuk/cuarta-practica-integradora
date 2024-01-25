import {cartManager} from '../dao/services/cartManager.mongoose.js'
import {productManager} from '../dao/services/productManager.mongoose.js'

export const cartController = {
    create: async (req, res) => {
        try {
            const cart = await cartManager.createCart()
            return res.status(200).json({status: "Success", payload: cart})
        } catch (error) {
            res.status(500).json({status: "Error", error: error.message})
        }
    },

    showCart: async (req, res) => {
        try {
            const {cid} = req.params
            const cart = await cartManager.getCartById(cid)
            return res.status(200).json({status: "Success", payload: cart})
        } catch (error) {
            res.status(404).json({status: "Error", error: error.message})
        }
   },

   addProduct:  async (req, res) => {
        try {      
            const {cid, pid} = req.params
            await productManager.getProductById(pid)
            const cart = await cartManager.addProductToCart(cid, pid)
            return res.status(200).json({status: "Success", payload: cart})
        } catch (error) {
            res.status(500).json({status: "Error", error: error.message})
        }
    },

    deleteProduct: async (req, res) => {
        try {      
            const {cid, pid} = req.params
            await cartManager.getCartById(cid)
            await productManager.getProductById(pid)
            const cart = await cartManager.deleteProductFromCart(cid, pid)
            return res.status(200).json({status: "Success", payload: cart})
        } catch (error) {
            res.status(500).json({status: "Error", error: error.message})
        }
    },

    updateCart: async (req, res) => {
        try {      
            const {cid} = req.params
            const {body}= req
            console.log(body)
            await cartManager.getCartById(cid)
            const cart = await cartManager.updateCart(cid, body)
            return res.status(200).json({status: "Success", payload: cart})
        } catch (error) {
            res.status(500).json({status: "Error", error: error.message})
        }
    },

    getAll: async (req, res) => {
        try {      
            const cart = await cartManager.findAll()
            return res.status(200).json({status: "Success", payload: cart})
        } catch (error) {
            res.status(500).json({status: "Error", error: error.message})
        }
    },

    updateProductInCart: async (req, res) => {
        try {      
            const {cid, pid} = req.params
            const {body} = req
            await productManager.getProductById(pid)
            const cart = await cartManager.updateProductCart(cid, pid, body)
            return res.status(200).json({status: "Success", payload: cart})
        } catch (error) {
            res.status(500).json({status: "Error", error: error.message})
        }
    },

    delete:  async (req, res) => {
        try {      
            const {cid} = req.params
            const cart = await cartManager.emptyCart(cid)
            return res.status(200).json({status: "Success", payload: cart})
        } catch (error) {
            res.status(500).json({status: "Error", error: error.message})
        }
    }
}