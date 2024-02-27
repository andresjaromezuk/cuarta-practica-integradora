import { userDao } from "../dao/factory.js"
import { userService } from "../services/user.service.js"
import { emailService } from "../services/email.service.js"

export async function handleGet(req, res, next){
   try {
       req.logger.http(`User - handleGet: ${req.method} en ${req.url}`)
       let result

       if(req.path.includes('profile')){
            result = await userService.readOne(req.user.email)
       }else if (req.path.includes('check')){
           console.log(req.query)
            const {q} = req.query
            console.log(q)
            const timestamp = Number(req.query.timestamp)
            const email = req.query.email
            switch(q){
                case 'restore':
                    console.log("Entraaa")
                    await userService.readOne(email)
                    await emailService.send_restore_email(email, "Recuperación de contraseña")
                    return res['successfullGet']("OK")
                break
                case 'reset':
                    console.log("ENTRA")
                    console.log(timestamp)
                    await userService.checkTimestamp(timestamp)
                    return res['successfullGet']("OK")
                break
            }    
       } else{
           result = await userService.readMany()
       }
        res['successfullGet'](result)
   } catch (error) {
       req.logger.error(`Error en users handleGet: ${error.message}`)
       next(error)
   }
}

export async function handlePost(req, res, next){
    try {
        return res['successfullPost'](req.jwt)
    } catch (error) {
        req.logger.error(`Error en users handlePost: ${error.message}`)
        next(error)
    }
}

export async function handlePut(req, res, next){
    try {
        req.logger.http(`User - handlePut: ${req.method} en ${req.url}`)
        req.logger.info(`Body: ${JSON.stringify(req.body)}`)
        await userService.resetPassword(req.body)
        res['successfullPut']("Nueva contraseña registrada")
    } catch (error) {
        req.logger.error(`Error en users handlePut: ${error.message}`)
        next(error)
    }
}