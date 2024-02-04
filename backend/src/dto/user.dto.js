export class UserDto{
    #_id
    #email
    #firstName
    #lastName
    #age
    #cartId
    #role
   
    constructor(user){
        this._id = user._id
        this.email = user.email 
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.age = user.age
        this.cartId = user.cartId
        this.role = user.role
    }

    dto(){
        return{
           _id: this._id,
           email: this.email,
           firstName: this.firstName,
           lastName: this.lastName,
           age: this.age,
           cartId: this.cartId,
           role: this.role
        }
    }

}

