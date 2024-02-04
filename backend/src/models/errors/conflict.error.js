import { ErrorTypes } from "./error.types.js"

export class ConflictError extends Error{
    constructor(){
        super('Forbidden Error')
        this.type = ErrorTypes.CONFLICT_ERROR
    }
}