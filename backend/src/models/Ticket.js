import { randomUUID, randomInt } from 'crypto'

export class Ticket{
    #_id
    #code 
    #purchase_datatime 
    #amount 
    #purchaser 
    #user_id 
    #products
    #status

    static statuses = { PENDING: 'pending', CANCELLED: 'cancelled', COMPLETED: 'completed' }


    constructor(
        _id = randomUUID(),
        code = Number(`${Date.now()}${randomInt(1000, 9999)}`) ,
        purchase_datatime = new Date,
        status = Ticket.statuses.PENDING,
    ){
        this.#_id = _id
        this.#code  = code
        this.#purchase_datatime  = purchase_datatime
        this.#status = status
    }

    get id(){return this.#_id}  
    get code(){return this.#code} 
    get purchase_datatime(){return this.#purchase_datatime} 
    get amount(){return this.#amount}
    get purchaser(){return this.#purchaser}
    get user_id(){return this.#user_id}
    get products(){return this.#products}
    get status(){ return this.#status} 

    set amount (value){
        if (!value){
            throw new Error('Parámetro requerido')
        }
        this.#amount = value
    }
    set purchaser (value){
        if (!value){
            throw new Error('Parámetro requerido')
        }
        this.#purchaser = value
    }
    set user_id (value){
        if (!value){
            throw new Error('Parámetro requerido')
        }
        this.#user_id = value
    }
    set products (value){
        if (value.length === 0){
            throw new Error('Parámetro requerido')
        }
        this.#products = value
    }
    
    complete(){
        this.#status = Ticket.statuses.COMPLETED
    }
    
    cancel(){
        this.#status = Ticket.statuses.CANCELLED
    }

    toObject(){
        return {
            _id: this.#_id,
            code:this.#code,
            purchase_datatime : this.#purchase_datatime,
            amount: this.#amount, 
            purchaser: this.#purchaser, 
            user_id: this.#user_id, 
            products: this.#products,
            status: this.#status
        }
    }

}