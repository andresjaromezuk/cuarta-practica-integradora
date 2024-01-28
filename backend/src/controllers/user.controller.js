import { userDao } from "../dao/factory.js"

export async function handleGet(req, res, next){
   try {
       let result

       if(req.path.includes('profile')){
            result = await userDao.readOne(req.user.email)
       }else{
            result = await userDao.readMany()
       }
    
        res['successfullGet'](result)
   } catch (error) {
       next(error)
   }
}

export async function handlePost(req, res, next){
    res['successfullPost'](req.jwt)
}

export async function handlePut(req, res, next){
    try {
        await userDao.resetPassword(req.body)
        res['successfullPut']("Nueva contraseña registrada")
    } catch (error) {
        next(error)
    }
}