//Passport
import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import {Strategy as GithubStrategy} from 'passport-github2'
import { ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt'

//Config
import {githubClientId, githubClientSecret, githubCallbackUrl} from '../config/github.config.js'
import {JWT_PRIVATE_KEY} from '../config/auth.config.js'

//Utils
import {encrypt} from "../utils/encryptor.js"

//Services
import { userService } from '../services/user.service.js'
import { sessionService } from '../services/session.service.js'

//Errors
import { AuthenticationError } from '../models/errors/authentication.errors.js'

//Cookies
const COOKIE_OPTS = { signed: true, maxAge: 1000 * 60 * 60,  domain: 'localhost', httpOnly: true }

passport.use('login', new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) =>{
  try {
    const user = await sessionService.login(email, password)
    done(null, user)
  } catch (error) {
    done(error)
  }
}))

passport.use('register', new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'email'
}, async (req, _u, _p, done)=>{
  try{
    req.logger.http(`User - Register: ${req.method} en ${req.url}`)
    req.logger.info(`Body: ${JSON.stringify(req.body)}`)
    const user = await userService.create(req.body)
    done(null, user)
  } catch (error){
    req.logger.error(`Error en users authentication.register: ${error.message}`)
    done(error)
  }
}))

passport.use('jwt', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([function (req) {
    let token = null
    let header = req.get('Authorization')
    if (header){
      header = header.split("Bearer")
      if (header.length > 1) {
        token = header[1].trim()
      }
    } else if (req?.signedCookies) {
      token = req.signedCookies['authorization']
    }
    console.log(`\n\n\n\n token ${token} \n\n\n`)
    if(!token){
      throw new AuthenticationError()
    }
    return token
  }]),
  secretOrKey: JWT_PRIVATE_KEY
}, (user, done) => {
  done(null, user)
}))

passport.use('github', new GithubStrategy({
  clientID: githubClientId,
  clientSecret: githubClientSecret,
  callbackURL: githubCallbackUrl
}, async function verify(accessToken, refreshToken, profile, done) {
  console.log(profile)

  const user = await userService.readOne({ email: profile.username })
  if (user) {
    return done(null, {
      ...user.publicInfo(),
      rol: 'usuario'
    })
  }

  try {
    const registered = await userService.create({
      email: profile.username,
      password: '(sin especificar)',
      firstName: profile.displayName,
      lastName: '(sin especificar)',
      age: 0
    })
    done(null, {
      ...registered.publicInfo(),
      rol: 'usuario'
    })
  } catch (error) {
    done(error)
  }

}))

export async function appendJwt(req, res, next){
  try {
    const jwt = await encrypt(req.user)
    //res.cookie('authorization', jwt, COOKIE_OPTS)
    req.jwt = jwt
    next()
  } catch (error) {
    next(error)
  }
}
export async function appendJwtAsCookie(req, res, next){
  try {
    const jwt = await encrypt(req.user)
    res.cookie('authorization', jwt, COOKIE_OPTS)
    next()
  } catch (error) {
    next(error)
  }
}

export async function removeJwtFromCookies(req, res, next) {
  const response = res.clearCookie('authorization', COOKIE_OPTS)
  next()
}


passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

const passportInitialize = passport.initialize()
const passportSession = passport.session()

export function authenticate(req, res, next) {
  passportInitialize(req, res, () => {
    passportSession(req, res, next)
  })
}