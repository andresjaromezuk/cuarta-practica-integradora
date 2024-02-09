import { ticketService } from "../services/ticket.service.js";
export async function handlePost(req, res, next){
    try {
        req.logger.http(`Ticket - handlePost: ${req.method} en ${req.url}`)
        req.logger.info(`Body: ${JSON.stringify(req.body)}`)
        const ticket = await ticketService.create(req.body)
        return res.status(200).json({status: "Success", payload: ticket})
    } catch (error) {
        req.logger.error(`Error en ticket handlePost: ${error.message}`)
        next(error)
    }
}