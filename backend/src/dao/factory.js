import { productDaoMongoose } from "./mongoose/product.dao.mongoose.js";

const persistence = 'mongoose'
let productDao

if (persistence === 'file'){
    productDao = productDaoMongoose
} else if (persistence === 'mongoose'){
    productDao = productDaoMongoose
}

export default productDao

