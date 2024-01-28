import { Router } from 'express'
import { handleGet,handlePost, handlePut } from '../../controllers/user.controller.js'
import {appendJwt} from '../../middleware/authentication.js'
import {apiUserLogged, apiAdminAccess} from '../../middleware/authorization.js'
import passport from 'passport'

export const userRouter = Router()

userRouter.post('/register',
  passport.authenticate('register', {
    failWithError: true,
    session:false
  }),
  appendJwt,
  handlePost
)

userRouter.get('/profile', 
  passport.authenticate('jwt', {
    failWithError: true,
    session: false
  }),
  apiUserLogged,
  handleGet
)

userRouter.get('/',
  passport.authenticate('jwt', {
    failWithError: true,
    session: false
  }),
  apiAdminAccess,
  handleGet
 )

userRouter.put('/resetPassword', handlePut)

