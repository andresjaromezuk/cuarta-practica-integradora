import { ticketService } from "../services/ticket.service.js";
export async function handlePost(req, res, next){
    try {
        const ticket = await ticketService.create(req.body)
        return res.status(200).json({status: "Success", payload: ticket})
    } catch (error) {
        next(error)
    }
}