import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto'
import { MongooseDao}  from './mongoose.dao.js'

const cartSchema = new Schema({
  _id: { type: String, default: randomUUID },
  products: [{product:{type: String, ref: 'products', required: true }, quantity:{type: Number, required: true}}]
}, {
  strict: 'throw',
  versionKey: false,
  statics: {},
  methods: {}
})

const dbCart = model('carts', cartSchema)

class CartDaoMongoose extends MongooseDao{
  constructor(model){
    super(model)
  }

  async readOnePopulated(id){
    const cart = await super.readOnePopulated({_id: id}, 'products.product')
    return cart
  }
  
  async readManyPopulated(criteria){
    const cart = await super.readManyPopulated(criteria, 'products.product')
    return cart
  }

}

export const cartDaoMongoose = new CartDaoMongoose(dbCart)