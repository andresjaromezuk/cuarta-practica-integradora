
export async function handleGet(req, res, next){
    res['successfullGet'](req.user)
}

export async function handlePost(req, res, next){
    res['successfullPost'](req.jwt)
}

export async function handleDelete(req, res, next){
    res['successfullLogout']()
}
