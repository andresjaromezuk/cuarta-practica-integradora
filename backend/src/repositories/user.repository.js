import { userDao } from "../dao/factory.js";

class UserRepository{
    constructor(){}

    async readOne(criteria){
        return userDao.readOne(criteria)
    }

    async uploadDocument(id, document){
        return await userDao.uploadDocument(id, document)
    }

}

export const userRepository = new UserRepository()