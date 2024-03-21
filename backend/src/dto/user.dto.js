export class UserDto{
   
    constructor(user){
        this._id = user._id
        this.email = user.email 
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.age = user.age
        this.cartId = user.cartId
        this.role = user.role
        this.documents = user.documents
        this.last_connection = user.last_connection
    }

    dto(){
        return{
           _id: this._id,
           email: this.email,
           firstName: this.firstName,
           lastName: this.lastName,
           age: this.age,
           cartId: this.cartId,
           role: this.role,
           documents : this.documents,
           last_connection : this.last_connection
        }
    }

}

