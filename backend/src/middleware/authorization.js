import { AuthenticationError } from "../models/errors/authentication.errors.js"
import { ForbiddenError } from "../models/errors/forbidden.error.js"


export function webUserLogged(error, req, res, next){
    if (!req.isAuthenticated()){
        return res.redirect('/sessions/login')
    }
    next()
}

export function apiUserLogged(req, res, next){
    if (!req.isAuthenticated()){
        next(new AuthenticationError())
    }
    next()
}

export function apiAdminAccess(req, res, next){
    if(req?.user?.role !== 'admin'){
        next(new ForbiddenError())
    }
    next()
}

export function apiAdminAndPremiumAccess(req, res, next){
    console.log("entra")
    console.log(req?.user?.role === 'premium' )
    if(req?.user?.role === 'admin' || req?.user?.role === 'premium' ){
        return next()
    }
    next(new ForbiddenError())
}