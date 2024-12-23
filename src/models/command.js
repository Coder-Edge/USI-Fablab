import {users} from "./users"
import {ListProducts} from "./product"

class Command {
    
    /**
     * @param {int} id 
     * @param {Date} date 
     * @param {User} user 
     * @param {List(dic(product, quantity))} product 
     */
    
    constructor (id, date,user, products) {
        if(typeof id === "object" && id != null) {
            const {id:borrowId, date: borrowDate, user: borrowUser, products: borrowProduct} = id
            this.id = borrowId
            this.date = borrowDate
            this.user = borrowUser
            this.products = borrowProduct
        } else {
            this.id = id
            this.date = date
            this.user = user
            this.products = products
        }
    }
}

const commands = [
    new Command({date: Date.now(), user: users[0], products: [{product: ListProducts[1], quantity: 20}, {product: ListProducts[2], quantity: 12}, {product: ListProducts[3], quantity: 10}]}),
    new Command({date: Date.now(), user: users[2], products: [{product: ListProducts[0], quantity: 5}, {product: ListProducts[0], quantity: 14}]}),
    new Command({date: Date.now(), user: users[3], products: [{product: ListProducts[5], quantity: 20}, {product: ListProducts[2], quantity: 4}]}),
    new Command({date: Date.now(), user: users[0], products: [{product: ListProducts[4], quantity: 20}]})
]

export { Command, commands }