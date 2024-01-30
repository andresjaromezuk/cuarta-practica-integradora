import { ticketDao } from "../dao/factory.js";
import { Ticket } from "../models/Ticket.js";


export class TicketRepository{

    async save(ticket){
        const ticketDto = await ticketDao.create(ticket.toObject())
        return new Ticket(ticketDto).toObject()
    }
}

export const ticketRepository = new TicketRepository()