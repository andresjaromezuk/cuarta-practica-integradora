import { faker } from '@faker-js/faker'

class MockProductService{
    constructor(){}

    readMany(){
        const mockProducts = []

        for (let i = 0; i < 100; i++) {
            mockProducts.push(
                {
                    _id: faker.string.uuid(),
                    title : faker.commerce.productName(), 
                    description : faker.commerce.productDescription(),
                    price : faker.commerce.price(),
                    thumbnail : [],
                    code : faker.database.mongodbObjectId(),
                    stock : faker.number.int(),
                    status : true,
                    category: faker.commerce.productAdjective() 
                }
            )
            
        }
        return mockProducts
    }
}

export const mockProductService = new MockProductService()