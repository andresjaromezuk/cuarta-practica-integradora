import {mockProductService} from '../../test/services/mock.product.service.js'

export function handleGet(req, res, next){
    try {
        const products = mockProductService.readMany()
        return res.status(200).json({status: "Success", payload: products})
    } catch (error) {
        next(error)
    }
}