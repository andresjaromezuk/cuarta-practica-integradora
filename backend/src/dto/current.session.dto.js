export class CurrentSessionDto{
    #email
    #firstName
    #lastName
    #age
    #cartId
    #role
   
    constructor(user){
        this.email = user.email 
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.age = user.age
        this.cartId = user.cartId
        this.role = user.role
    }

    dto(){
        return{
           email: this.email,
           firstName: this.firstName,
           lastName: this.lastName,
           age: this.age,
           cartId: this.cartId,
           role: this.role
        }
    }

}

