import {ErrorTypes} from './error.types.js'

export class AuthenticationError extends Error{
    constructor(){
        super('Authentication error')
        this.type = ErrorTypes.AUTH_ERROR
    }
}