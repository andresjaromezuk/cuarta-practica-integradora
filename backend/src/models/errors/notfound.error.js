import {ErrorTypes} from './error.types.js'

export class NotFoundError extends Error{
    constructor(entity){
        super(`${entity} not found`)
        this.type = ErrorTypes.NOT_FOUND_ERROR
    }
}