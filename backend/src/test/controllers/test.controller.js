export function handleGet(req, res, next){
    req.logger.debug('Debug')
    req.logger.http(`${req.method} en ${req.url}`)
    req.logger.info('Info')
    req.logger.warning('Warning')
    req.logger.error('Error')
    req.logger.fatal('Fatal error')
    res.send('Listo, chequear logs.')
}