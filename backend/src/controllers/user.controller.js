import { dbUser } from '../dao/models/mongoose/user.mongoose.js'


export const userController = {
    register:  function (req, res, next) {
        res['successfullPost'](req.jwt)
    },

    profile: async (req, res, next)=> {
        res['successfullGet'](req.user)
    },

    getAll:  async(req, res, next)=>{
        const users = await dbUser.find({}, { password: 0 }).lean()
        res['successfullGet'](req.user)
    },

    resetPassword: async (req, res) =>{
        try {
            await dbUser.resetPassword(req.body)
            res['successfullPut']("Nueva contraseña registrada")
        } catch (error) {
            next(error)
        }
    }

}