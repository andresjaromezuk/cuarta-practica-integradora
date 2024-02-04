import { ErrorTypes } from "./error.types.js";

export class UnprocessableEntityError extends Error{
    constructor(entity){
        super(`${entity} required`)
        this.type = ErrorTypes.UNPROCESSABLE_ENTITY_ERROR
    }
}