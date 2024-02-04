export function errorHandler(error, req, res, next){
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
        res.status(500)
    }
    console.log(error)

    res.json({
        status: 'error',
        message: error.message,
      })
}

