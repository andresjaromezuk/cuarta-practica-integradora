import { Router } from 'express'
import passport from 'passport'
import { handleGet, handlePost, handleDelete } from '../../controllers/web/session.controller.js'
import { appendJwtAsCookie, removeJwtFromCookies } from '../../middleware/authentication.js'

export const sessionRouter = Router()

//Formulario de login
sessionRouter.get('/login', handleGet)

sessionRouter.post('/login',
  passport.authenticate('login', {
    failWithError: true,
    session:false
  }),
  appendJwtAsCookie,
  handlePost
)

sessionRouter.delete('/logout', removeJwtFromCookies, handleDelete)