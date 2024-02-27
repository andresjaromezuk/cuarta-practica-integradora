//DAO
import { userDao } from "../dao/factory.js"

//Errors
import {NotFoundError} from '../models/errors/notfound.error.js'
import {ConflictError} from '../models/errors/conflict.error.js'
import { UnprocessableEntityError } from "../models/errors/unprocessable.entity.error.js"

//DTO
import { UserDto } from "../dto/user.dto.js"

//Utils
import { isValidPassword } from "../utils/encryptor.js"

class UserService {
    constructor(){}

    async readOne(criteria){
        const user = await userDao.readOne(criteria)
        if(!user)throw new NotFoundError('User')
        return new UserDto(user).dto()
    }

    async readMany(){
        return await userDao.readMany()
    }

    async create(body){
        const user = await userDao.readOne(body.email)
        console.log(user)
        if (user) throw new ConflictError()
        return await userDao.create(body)
    }

    async resetPassword (body){
        const {email, password} = body
        const user = await userDao.readOne(email)
        const test = isValidPassword(password, user)
        if(test) throw new UnprocessableEntityError('No puedes usar la contraseña antigua')
        return await userDao.resetPassword(body)
    }
   
    async checkTimestamp (timestamp){
        const checkTime = Date.now() - timestamp
        if (checkTime> 3600000) throw new Error('Link expirado') 
    }

}

export const userService = new UserService()