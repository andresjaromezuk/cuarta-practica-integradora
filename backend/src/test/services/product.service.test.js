import assert from 'node:assert/strict'
import {productService} from '../../services/product.service.js'
import { connectDB, disconnectDB } from '../../database/mongodb.js'

const mockProduct =  {
    "title": "Sal Chicha de Viena",
    "description": "Rajá de Austria",
    "price": 1000,
    "thumbnail": [],
    "code": "salchi345",
    "stock": 40,
    "status": true,
    "category": "productos",
    "owner": "admin"
}

const mockUser ={
    role: "admin" 
}

const mockFile = {}

let product 
  
describe('Product Service', () => {
    before(async () => {
        await connectDB()
    })

    after(async () => {
        await disconnectDB()
    })
    
    describe('Create Product', () => {
    describe('with valid data', () => {
        it('product with new id ', async () => {
        product = await productService.create(mockProduct,mockFile, mockUser)
        assert.ok(product._id)
        })

    })
    })
   
    describe('Delete Product', () => {
        it('Product deleted', async () => {
        const productToDelete = await productService.deleteOne({_id: product._id}, mockUser)
        assert.ok(productToDelete._id)
        })
    })
})
