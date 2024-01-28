import {productDao} from "../dao/factory.js"

export async function handleGet(req, res, next){
    try {
        let result
        if (req.params.id){
            result = await productDao.readOne({ _id: req.params.id }) 
        }else{
            result = await productDao.readManyPaginated(req.query, 'products')
        } 
        return res.status(200).json({status: "Success", payload: result})
    } catch (error) {
        next(error)
    }
}

export async function handlePost(req, res, next){
    try {
        const product = await productDao.create(req.body, req.file)
        return res.status(200).json({status: "Success", payload: product})
    } catch (error) {
        next(error)
    }
}

export async function handlePut(req, res, next){
    try {
        const product = await productDao.updateOne({ _id: req.params.id }, req.body, req.file)
        return res.status(200).json({status: "Success", payload: product})
    } catch (error) {
        next(error)
    }
}

export async function handleDelete(req, res, next){
    try {
        const product = await productDao.deleteOne(req.params.id)
        return res.status(200).json({status: "Success", payload: product})
    } catch (error) {
        next(error)
    }
}