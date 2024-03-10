import { randomUUID } from 'crypto'

export class Product{
    #_id
    #title  
    #description 
    #price  
    #thumbnail 
    #code  
    #stock  
    #status 
    #category 
    #owner

    constructor(
        { 
            _id = randomUUID(),
            title,  
            description, 
            price,  
            thumbnail, 
            code,  
            stock,  
            status, 
            category, 
            owner
        }
    ){
        this.#_id = _id
        this.#title = title 
        this.#description = description
        this.#price  = price
        this.#thumbnail = thumbnail
        this.#code  = code
        this.#stock  = stock
        this.#status = status
        this.#category = category
        this.#owner = owner
    }

    get _id() {return this.#_id} 
    get title() {return this.#title}  
    get description() {return this.#description} 
    get price() {return this.#price}  
    get thumbnail() {return this.#thumbnail} 
    get code() {return this.#code}  
    get stock() {return this.#stock}  
    get status() {return this.#status} 
    get category() {return this.#category} 
    get owner() {return this.#owner}

    set _id(value){
        this._id =  value
    } 
    set title(value){
        this.title =  value 
    }  
    set description(value){
        this.description =  value 
    } 
    set price(value){
        this.#price = value  
    }  
    set thumbnail(value){
        this.#thumbnail = value
    } 
    set code(value){
        this.#code = value  
    }  
    set stock(value){
        this.#stock = value  
    }  
    set status(value){
        this.#status = value 
    } 
    set category(value){
        this.#category = value
    } 
    set owner(value){
        this.#owner = value
    }
    

    toObject(){
        return {
            _id: this.#_id,
            title: this.#title,    
            description: this.#description,  
            price: this.#price,    
            thumbnail: this.#thumbnail,  
            code: this.#code,    
            stock: this.#stock,    
            status: this.#status,  
            category: this.#category,  
            owner: this.#owner
        }
    }

}