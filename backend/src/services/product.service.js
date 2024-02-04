import {productDao} from '../dao/factory.js'
import { NotFoundError } from '../models/errors/notfound.error.js'

class ProductService{
    constructor(){}

    async readOne(criteria){
        const result = await productDao.readOne(criteria)
        if(!result)throw new NotFoundError('Product')
        return result
    }

    async readManyPaginated(data, entity){
        return await productDao.readManyPaginated(data, entity)
    } 

    async create(element, file){
        return await productDao.create(element, file) 
    }

    async updateOne(criteria, newData, file){
        await this.readOne(criteria)
        return await productDao.updateOne(criteria, newData, file)
    }

    async deleteOne(id){
        await this.readOne(criteria)
        return await productDao.delete(id)
    }
}

export const productService = new ProductService()