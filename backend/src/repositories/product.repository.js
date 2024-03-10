import { productDao } from "../dao/factory.js";
import { Product } from "../models/Product.js";


export class ProductRepository{

    async readOne (criteria){
        const productDto = await productDao.readOne(criteria)
        return new Product(productDto)
    }

    async readManyPaginated(data, entity){
        return await productDao.readManyPaginated(data, entity)
    }

    async create(product, file){
        const productCreated = await productDao.create(product.toObject(), file)
        return new Product(productCreated)
    }

    async updateOne(criteria, newData, file){
        return await productDao.updateOne(criteria, newData.toObject(), file)
    }

    async deleteOne(id){
        return await productDao.deleteOne(id) 
    }
}

export const productRepository = new ProductRepository()