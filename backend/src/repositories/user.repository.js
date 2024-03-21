import { userDao } from "../dao/factory.js";

class UserRepository{
    constructor(){}

    async readOne(criteria){
        return userDao.readOne(criteria)
    }

    async uploadDocument(id, document){
        return await userDao.uploadDocument(id, document)
    }

    async updateOne(criteria, newData){
        return await userDao.updateOne(criteria, newData)
    }

}

export const userRepository = new UserRepository()