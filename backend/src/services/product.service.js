import { productRepository } from '../repositories/product.repository.js'
import { NotFoundError } from '../models/errors/notfound.error.js'
import { productDao } from "../dao/factory.js";
import { Product } from '../models/Product.js';
import { HOST } from '../config/server.config.js';

class ProductService{
    constructor(){}

    async readOne(criteria){
        const product = await productRepository.readOne(criteria)
        if(!product)throw new NotFoundError('Product')
        return product.toObject()
    }

    async readManyPaginated(data, entity){
        return await productRepository.readManyPaginated(data, entity)
    } 

    async create(element, file, user){
        if (user.role === 'premium'){
            element.owner = user.email
        } 
        const product = new Product(element)
        if (Object.keys(file).length > 0) {
            product.thumbnail = [`${HOST}/static/images/products/${file.filename}`]
        }
        const productCreated = await productRepository.create(product) 
        return productCreated.toObject()
    }

    async updateOne(criteria, newData, file, user){
        const product = await this.readOne(criteria)
        if (product.owner ===  user.email || user.role === 'admin'){
            const productToUpdate = new Product(newData)
            if (file) {
                newData.thumbnail = [`http://localhost:8080/static/images/products/${file.filename}`]
            }
            const updatedProduct = await productRepository.updateOne(criteria, productToUpdate)
            return updatedProduct.toObject()
        }
    }

    async deleteOne(id, user){
        const product = await this.readOne(id)
        console.log("product", product)
        if (product.owner ===  user.email || user.role === 'admin'){
            return await productRepository.deleteOne(id)
        }
    }
}

export const productService = new ProductService()