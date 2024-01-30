import { productDaoMongoose } from "./mongoose/product.dao.mongoose.js";
import { cartDaoMongoose } from "./mongoose/cart.dao.mongoose.js";
import { userDaoMongoose } from "./mongoose/user.dao.mongoose.js";
import { ticketDaoMongoose } from "./mongoose/ticket.dao.mongoose.js";
import { PERSISTENCE } from "../config/mongodb.config.js";

const persistence = PERSISTENCE
export let productDao
export let cartDao
export let userDao
export let ticketDao

if (persistence === 'file'){
    //Aún no implementado
    productDao = ""
    cartDao = ""
    userDao = ""
} else if (persistence === 'mongoose'){
    productDao = productDaoMongoose
    cartDao = cartDaoMongoose
    userDao = userDaoMongoose
    ticketDao = ticketDaoMongoose
}



