import {users} from "./users"
import {ListProducts} from "./product"

class Command {
    
    /**
     * @param {int} id 
     * @param {Date} date 
     * @param {User} user 
     * @param {boolean} status 
     * @param {Product} product 
     */
    
    constructor (id, date, user, product, quantity,status) {
        if(typeof id === "object" && id != null) {
            const {id: commandId, date: commandDate, user: commandUser, product: commandProduct, status: commandStatus, quantity: commandQuantity} = id
            this.id = commandId
            this.date = commandDate
            this.user = commandUser
            this.product = commandProduct
            this.status = commandStatus
            this.quantity = commandQuantity
        } else {
            this.id = id
            this.date = date
            this.user = user
            this.product = product
            this.status = status
            this.quantity = quantity
        }
    }
}

const commands = [
    new Command({date: Date.now(), user: users[1], product: ListProducts[0], quantity: 2, status: 0}),
    new Command({date: Date.now(), user: users[0], product: ListProducts[15], quantity: 10, status: 0}),
    new Command({date: Date.now(), user: users[2], product: ListProducts[6], quantity: 10, status: 0}),
    new Command({date: Date.now(), user: users[3], product: ListProducts[8], quantity: 8, status: 0}),
    new Command({date: Date.now(), user: users[0], product: ListProducts[7], quantity: 5, status: 0}),
    new Command({date: Date.now(), user: users[0], product: ListProducts[1], quantity: 2, status: 0}),
    new Command({date: Date.now(), user: users[2], product: ListProducts[2], quantity: 5, status: 0}),
    new Command({date: Date.now(), user: users[1], product: ListProducts[5], quantity: 3, status: 0}),
    new Command({date: Date.now(), user: users[3], product: ListProducts[14], quantity: 10, status: 0}),
]

export { Command, commands }