

export function handleGet(req, res, next){
    try {
        console.log("entra")
        return res.render('login', {title: "Login"}) 
    } catch (error) {
        next(error)
    }
}

export function handlePost(req, res, next){
    try {
        return res['successfullPost'](req.user)
    } catch (error) {
        next(error)
    }
}

export function handleDelete(req, res, next){
    try {
        return res['successfullLogout']()
    } catch (error) {
        next(error)
    }
}