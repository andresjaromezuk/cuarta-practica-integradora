import { logger } from "../utils/logger.js"

export function logHandler(req, res, next){
    req.logger = logger
    next()
}