import { ErrorTypes } from "./error.types.js"

export class ConflictError extends Error{
    constructor(){
        super('User registered')
        this.type = ErrorTypes.CONFLICT_ERROR
    }
}