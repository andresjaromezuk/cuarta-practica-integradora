import {ErrorTypes} from './error.types.js'

export class ForbiddenError extends Error{
    constructor(){
        super('Forbidden Error')
        this.type = ErrorTypes.FORBIDDEN_ERROR
    }
}