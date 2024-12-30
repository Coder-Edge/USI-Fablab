import {users} from "./users"
import {ListProducts, Product} from "./product"

class Borrow {
    /**
     * @param {int} id 
     * @param {Date} date 
     * @param {User} user 
     * @param {Date} enddate 
     * @param {Product} product 
     * 
     */
    
    constructor (id, user, product, date, enddate, quantity) {
        if(typeof id === "object" && id != null) {
            const {id:borrowId, date: borrowDate, user: borrowUser, product: borrowProduct, enddate: borrowEndate, quantity: borrowQuantity} = id
            this.id = borrowId
            this.date = borrowDate
            this.user = borrowUser
            this.product = borrowProduct
            this.enddate = borrowEndate
            this.quantity = borrowQuantity
        } else {
            this.id = id
            this.date = date
            this.user = user
            this.product = product
            this.enddate = enddate
            this.quantity = quantity
        }
    }
}

function setEnddate(date, num_of_days) {
    let result = new Date(date)
    return result.setDate(result.getDate()+num_of_days)
}

const borrows = [
    new Borrow({user: users[0], product: ListProducts[1], quantity: 3, date: Date.now(), enddate: setEnddate(Date.now(), 3)}),
    new Borrow({user: users[2], product: ListProducts[0], quantity: 10, date: Date.now(), enddate: setEnddate(Date.now(), 3)}),
    new Borrow({user: users[3], product: ListProducts[1], quantity: 4, date: Date.now(), enddate: setEnddate(Date.now(), 3)}),
    new Borrow({user: users[1], product: ListProducts[0], quantity: 1, date: Date.now(), enddate: setEnddate(Date.now(), 3)}),
    new Borrow({user: users[3], product: ListProducts[0], quantity: 8, date: Date.now(), enddate: setEnddate(Date.now(), 3)}),
    new Borrow({user: users[0], product: ListProducts[0], quantity: 6, date: Date.now(), enddate: setEnddate(Date.now(), 3)}),
    new Borrow({user: users[2], product: ListProducts[1], quantity: 2, date: Date.now(), enddate: setEnddate(Date.now(), 3)}),
    new Borrow({user: users[1], product: ListProducts[1], quantity: 9, date: Date.now(), enddate: setEnddate(Date.now(), 3)}),
]

export { Borrow, borrows }