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

    async create(element, file, user){
        if (user.role === 'premium'){
            element.owner = user.email
        } 
        return await productDao.create(element, file) 
    }

    async updateOne(criteria, newData, file){
        const product = await this.readOne(criteria)
        if (product.owner ===  user.role || user.role === 'admin'){
            return await productDao.updateOne(criteria, newData, file)
        }
    }

    async deleteOne(id, user){
        const product = await this.readOne(criteria)
        if (product.owner ===  user.role || user.role === 'admin'){
            return await productDao.delete(id)
        }
    }
}

export const productService = new ProductService()