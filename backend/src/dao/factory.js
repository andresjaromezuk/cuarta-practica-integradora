import { productDaoMongoose } from "./mongoose/product.dao.mongoose.js";
import { cartDaoMongoose } from "./mongoose/cart.dao.mongoose.js";
import { userDaoMongoose } from "./mongoose/user.dao.mongoose.js";

const persistence = 'mongoose'
export let productDao
export let cartDao
export let userDao

if (persistence === 'file'){
    //Aún no implementado
    productDao = ""
    cartDao = ""
    userDao = ""
} else if (persistence === 'mongoose'){
    productDao = productDaoMongoose
    cartDao = cartDaoMongoose
    userDao = userDaoMongoose
}



