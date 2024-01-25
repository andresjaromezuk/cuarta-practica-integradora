import { Router } from 'express'
import { userController } from '../../controllers/user.controller.js'
import {appendJwt} from '../../middleware/authentication.js'
import {apiUserLogged, apiAdminAccess} from '../../middleware/authorization.js'
import passport from 'passport'
import { dbUser } from '../../dao/models/mongoose/user.mongoose.js'

export const userRouter = Router()

userRouter.post('/register',
  passport.authenticate('register', {
    failWithError: true,
    session:false
  }),
  appendJwt,
  userController.register
)

userRouter.get('/profile', 
  passport.authenticate('jwt', {
    failWithError: true,
    session: false
  }),
  apiUserLogged,
  userController.profile
)

userRouter.get('/',
  passport.authenticate('jwt', {
    failWithError: true,
    session: false
  }),
  apiAdminAccess,
  userController.getAll
 )

userRouter.put('/resetPassword', userController.resetPassword)

