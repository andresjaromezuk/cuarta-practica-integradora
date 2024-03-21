//DAO
import { userDao } from "../dao/factory.js"

//Errors
import {NotFoundError} from '../models/errors/notfound.error.js'
import {ConflictError} from '../models/errors/conflict.error.js'
import { UnprocessableEntityError } from "../models/errors/unprocessable.entity.error.js"

//Repository
import { userRepository } from "../repositories/user.repository.js"

//DTO
import { UserDto } from "../dto/user.dto.js"

//Utils
import { isValidPassword } from "../utils/encryptor.js"

//Config
import { HOST } from "../config/server.config.js"

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
        const user = await userDao.readOne({email: body.email})
        console.log(user)
        if (user) throw new ConflictError()
        return await userDao.create(body)
    }

    async resetPassword (body){
        const {email, password} = body
        const user = await userDao.readOne({email: body.email})
        const test = isValidPassword(password, user)
        if(test) throw new UnprocessableEntityError('No puedes usar la contraseña antigua')
        return await userDao.resetPassword(body)
    }
   
    async checkTimestamp (timestamp){
        const checkTime = Date.now() - timestamp
        if (checkTime> 3600000) throw new Error('Link expirado') 
    }

    async uploadDocument(file, id){
        await userDao.readOne({_id: id})
        const document = [
            {
                name: file.filename,
                reference: `${HOST}/static/images/documents/${file.filename}`
            }
        ]
        return userRepository.uploadDocument({_id: id},document)
    }

    async setUserToPremium(id){
        let user = await userRepository.readOne(id)
        const documents = user.documents.length
        if (documents < 3){
            throw UnprocessableEntityError("Documents")
        }
        user.role = "premium"
        //user = await user
    }

}

export const userService = new UserService()