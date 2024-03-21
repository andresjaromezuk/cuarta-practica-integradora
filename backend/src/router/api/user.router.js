import { Router } from 'express'
import passport from 'passport'
import { handleGet,handlePost, handlePut } from '../../controllers/user.controller.js'
import {appendJwt} from '../../middleware/authentication.js'
import {apiUserLogged, apiAdminAccess} from '../../middleware/authorization.js'
import multerMiddleware from '../../middleware/multer.js'
const uploadProfile =  multerMiddleware('profiles', 'profile')
const uploadDocument = multerMiddleware('documents', 'document')


export const userRouter = Router()

userRouter.post('/register',
  passport.authenticate('register', {
    failWithError: true,
    session:false
  }),
  appendJwt,
  handlePost
)

userRouter.get('/check',
  handleGet
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

userRouter.post('/:id/documents', uploadDocument.single('image'), handlePost)

userRouter.put('/resetPassword', handlePut)

userRouter.post('/premium/:id', 
passport.authenticate('jwt', {
  failWithError: true,
  session: false
}),
apiUserLogged, 
handlePost)

