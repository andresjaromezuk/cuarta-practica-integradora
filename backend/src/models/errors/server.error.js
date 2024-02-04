import { ErrorTypes } from "./error.types.js"

export class ServerError extends Error{
    constructor(){
        super('Server Error')
        this.type = ErrorTypes.SERVER_ERROR
    }
}