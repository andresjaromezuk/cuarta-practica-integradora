import { Schema, model } from 'mongoose'
import { MongooseDao } from './mongoose.dao.js'

const ticketSchema = new Schema({
  _id: { type: String },
  code: { type: String },
  purchase_datatime: { type: String },
  amount: { type: Number },
  purchaser: { type: String },
  user_id: { type: String },
  products: [{product:{type: String, ref: 'products', required: true }, quantity:{type: Number, required: true}}],
  status:{ type: String }
}, {
  strict: 'throw',
  versionKey: false,
  statics: {},
  methods: {}
})

const dbTickets = model('tickets', ticketSchema)

export const ticketDaoMongoose = new MongooseDao(dbTickets)