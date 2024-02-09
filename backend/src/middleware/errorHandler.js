export function errorHandler(error, req, res, next){
    req.logger.error(error.message)
    if (error.type === 5 ){
        res.status(409)
    } else if (error.type === 1){
        res.status(401)
    }else if(error.type === 2){
        res.status(404)
    } else if(error.type === 3){
        res.status(403)
    } else if(error.type === 6){
        res.status(422)
    } else{
        req.logger.fatal(`Error 500 - error handler: ${error.message}`)
        res.status(500)
    }
    console.log(error)

    res.json({
        status: 'error',
        message: error.message,
      })
}

