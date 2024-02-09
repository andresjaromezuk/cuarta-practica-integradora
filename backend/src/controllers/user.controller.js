import { userDao } from "../dao/factory.js"
import { userService } from "../services/user.service.js"

export async function handleGet(req, res, next){
   try {
       req.logger.http(`User - handleGet: ${req.method} en ${req.url}`)
       let result

       if(req.path.includes('profile')){
            result = await userService.readOne(req.user.email)
       }else{
            result = await userService.readMany()
       }
        res['successfullGet'](result)
   } catch (error) {
       req.logger.error(`Error en users handleGet: ${error.message}`)
       next(error)
   }
}

export async function handlePost(req, res, next){
    res['successfullPost'](req.jwt)
}

export async function handlePut(req, res, next){
    try {
        req.logger.http(`User - handlePut: ${req.method} en ${req.url}`)
        req.logger.info(`Body: ${JSON.stringify(req.body)}`)
        await userDao.resetPassword(req.body)
        res['successfullPut']("Nueva contraseña registrada")
    } catch (error) {
        req.logger.error(`Error en users handlePut: ${error.message}`)
        next(error)
    }
}