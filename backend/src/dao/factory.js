import { productDaoMongoose } from "./mongoose/product.dao.mongoose.js";
import { cartDaoMongoose } from "./mongoose/cart.dao.mongoose.js";

const persistence = 'mongoose'
export let productDao
export let cartDao

if (persistence === 'file'){
    productDao = productDaoMongoose
    cartDao = cartDaoMongoose
} else if (persistence === 'mongoose'){
    productDao = productDaoMongoose
    cartDao = cartDaoMongoose
}



