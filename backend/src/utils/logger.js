import winston from 'winston'
import {NODE_ENV} from '../config/server.config.js'

export let logger

const levelOptions = {
    levels:{
        fatal: 0,
        error: 1,
        warning: 2,
        info:3,
        http:4,
        debug:5
    }
}

if (NODE_ENV === 'production'){
    logger = winston.createLogger({
        levels: levelOptions.levels,
        transports:[
            new winston.transports.Console({level: 'info'}),
            new winston.transports.File({filename:'../logs/errors.log', level: 'error'})
        ]
    })
}else{
    logger = winston.createLogger({
        levels: levelOptions.levels,
        transports:[
            new winston.transports.Console({level: 'debug'}),
            new winston.transports.File({filename:'../logs/errors.log', level: 'error'})
        ]
    })
}
