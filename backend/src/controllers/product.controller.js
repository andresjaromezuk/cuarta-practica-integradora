import {productManager} from '../dao/services/productManager.mongoose.js'

export const productController = {
    getAll: async (req,res,next) =>{
        const products =  await productManager.getProducts(req.query)
        if (products.length === 0) {
            return res.status(404).json({status: "Error", error: "No existen productos."})
        }
        return res.status(200).json({status: "Success", payload: products})
    },

    getById: async (req,res, next)=>{
        try {
            const id = req.params.id
            const product = await productManager.getProductById(id)
            return res.status(200).json({status: "Success", payload: product})
        } catch (error) {
            console.log(error)
            res.status(404).json({status: "Error", error: error.message})
        }
    },

    create:   async (req,res, next)=>{
        try {
            const {body} = req
            const product = await productManager.addProduct(body)
            return res.status(200).json({status: "Success", payload: product})
        } catch (error) {
            res.status(500).json({status: "Error", error: error.message})
        }
    },

    update: async (req, res, next)=>{
        try {
            const {pid} = req.params
            const {body} = req
            const product = await productManager.updateProduct(pid, body)
            return res.status(200).json({status: "Success", payload: product})
        } catch (error) {
            res.status(500).json({status: "Error", error: error.message})
        }
    },

    delete: async (req, res, next)=>{
        try {
            const {pid} = req.params
            const product = await productManager.deleteProduct(pid)
            return res.status(200).json({status: "Success", payload: product})
        } catch (error) {
            res.status(500).json({status: "Error", error: error.message})
        }
    }
}