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
     
        const user = await userDao.readOne(email)
    
        if(!user) throw new AuthenticationError()
        
        const isValid = isValidPassword(password, user)
    
        if(!isValid) throw new AuthenticationError()
        
        return new UserDto(user).dto()
    }
}

export const sessionService = new SessionService()