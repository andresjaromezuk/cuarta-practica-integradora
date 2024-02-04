//DAO
import { userDao } from "../dao/factory.js"

//Errors
import {NotFoundError} from '../models/errors/notfound.error.js'
import {ConflictError} from '../models/errors/conflict.error.js'

//DTO
import { UserDto } from "../dto/user.dto.js"

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
        await this.readOne(body.email)
        return await userDao.resetPassword(body)
    }

}

export const userService = new UserService()