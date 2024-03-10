import { productService } from "../services/product.service.js"

export async function handleGet(req, res, next){
    try {
        req.logger.http(`Products - handleGet: ${req.method} en ${req.url}`)
        let result
        if (req.params.id){
            req.logger.info(`Id: ${req.params.id}`)
            result = await productService.readOne({ _id: req.params.id }) 
        }else{
            req.logger.info(`Query: ${req.query}`)
            result = await productService.readManyPaginated(req.query, 'products')
        } 
        return res.status(200).json({status: "Success", payload: result})
    } catch (error) {
        req.logger.error(`Error en products handleGet: ${error.message}`)
        next(error)
    }
}

export async function handlePost(req, res, next){
    try {
        req.logger.http(`Products - handlePost: ${req.method} en ${req.url}`)
        req.logger.info(`Body: ${JSON.stringify(req.body)}`)
        const product = await productService.create(req.body, req.file, req.user)
        return res.status(200).json({status: "Success", payload: product})
    } catch (error) {
        req.logger.error(`Error en products handlePost: ${error.message}`)
        next(error)
    }
}

export async function handlePut(req, res, next){
    try {
        req.logger.http(`Products - handlePut: ${req.method} en ${req.url}`)
        req.logger.info(`Body: ${JSON.stringify(req.body)}`)
        const product = await productService.updateOne({ _id: req.params.id }, req.body, req.file, req.user)
        return res.status(200).json({status: "Success", payload: product})
    } catch (error) {
        req.logger.error(`Error en products handlePut: ${error.message}`)
        next(error)
    }
}

export async function handleDelete(req, res, next){
    try {
        req.logger.http(`Products - handleDelete: ${req.method} en ${req.url}`)
        req.logger.info(`Id: ${req.params.id}`)
        const product = await productService.deleteOne({ _id: req.params.id }, req.user)
        return res.status(200).json({status: "Success", payload: product})
    } catch (error) {
        req.logger.error(`Error en products handleDelete: ${error.message}`)
        next(error)
    }
}