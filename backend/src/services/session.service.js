//DAO
import { userDao } from "../dao/factory.js"

//Errors
import { AuthenticationError } from "../models/errors/authentication.errors.js"

//DTO
import { UserDto } from "../dto/user.dto.js"

//Utils
import { isValidPassword } from "../utils/encryptor.js"

class SessionService{
    constructor(){}

    async login (email, password){
     
        let user = await userDao.readOne({email:email})
    
        if(!user) throw new AuthenticationError()
        
        const isValid = isValidPassword(password, user)
    
        if(!isValid) throw new AuthenticationError()

        user.last_connection = new Date()

        user = await userDao.updateOne({email:email}, user) 
        
        return new UserDto(user).dto()
    }
}

export const sessionService = new SessionService()