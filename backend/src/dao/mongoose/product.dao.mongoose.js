import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { MongooseDao}  from './mongoose.dao.js'
import fs from 'fs/promises'
import { randomUUID } from 'crypto'
import __dirname from '../../util.js'
import path from 'path'


const productSchema = new Schema({
  _id: { type: String},
  title : { type: String, required: true }, 
  description : { type: String, required: true },
  price : { type: Number, required: true },
  thumbnail : [{ type: String, required: true }],
  code : { type: String, unique: true, required: true },
  stock : { type: Number, required: true },
  status : { type: Boolean, required: true },
  category : { type: String, required: true },
  owner:{ type: String, default: 'admin'}
}, {
  strict: 'throw',
  versionKey: false,
  statics: {},
  methods: {}
})

productSchema.plugin(mongoosePaginate)

const dbProduct = model('products', productSchema)

class ProductDaoMongoose extends MongooseDao{
  constructor(model){
    super(model)
  }
  async readManyPaginated(data, entity){
    return await super.readManyPaginated(data, entity)
  }

  async create(element){
    return await super.create(element)
  }

  async updateOne(criteria, newData ){
    return await super.updateOne(criteria, newData)
  }

  async deleteOne(id){
    const product = await super.deleteOne({_id: id})
    
    if (product.thumbnail.length > 0){
        const filename = product.thumbnail[0].split("products/")[1]
        console.log(filename)
        const filePath = path.join(__dirname, `../static/images/products/${filename}`)
        console.log(filePath)
        await fs.unlink(filePath)
    }

    return product
  }
}

export const productDaoMongoose = new ProductDaoMongoose(dbProduct) 