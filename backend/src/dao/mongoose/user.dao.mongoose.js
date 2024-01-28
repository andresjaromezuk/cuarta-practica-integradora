import mongoose from "mongoose"
import { randomUUID } from "node:crypto"
import { createHash, isValidPassword } from '../../utils/encryptor.js'
import { MongooseDao } from "./mongoose.dao.js"
import { CurrentSessionDto } from "../../dto/current.session.dto.js"

const userSchema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  cartId: { type: Number, default: null},
  role: { type: String, default: "user"},
}, {
  strict: 'throw',
  versionKey: false,
  methods: {
    publicInfo: function(){
      return{
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName
      }
    }
  },
  statics: {}
})

const dbUser = mongoose.model('users', userSchema)

class UserDaoMongoose extends MongooseDao{
  constructor(model){
    super(model)
  }

  async register (body){
    const {password} = body
    const checkUser = await mongoose.model('users').findOne({email:body.email}).lean()
    if(checkUser){
        throw new Error ('El usuario ya está registrado')
    }
    const hash = createHash(password)
    body.password = hash
    const user = await super.create(body)
    return user
  }

  async login (email, password){
     
    const user = await super.readOne({email: email})

    if(!user){
        throw new Error ('Credenciales incorrectas')
    }
    const isValid = isValidPassword(password, user)

    if(!isValid){
      throw new Error ('Credenciales incorrectas')
    }

    return new CurrentSessionDto(user).dto()
  }

  async resetPassword (body) {
    const {email, password} = body
    const newPassword = createHash(password)

    const actualizado = await super.updateOne({ email },{ $set: { password: newPassword } })

    if (!actualizado) {
      throw new Error('usuario no encontrado')
    }

    return actualizado
  }

  async readOne(email){
    const result = await mongoose.model('users').findOne({email: email}).select('-password')
    return result 
  }
  
  async readMany(email){
    const result = await mongoose.model('users').find({}).select('-password')
    return result 
  }
}

export const userDaoMongoose = new UserDaoMongoose(dbUser)