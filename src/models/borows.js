import {users} from "./users"
import {ListProducts} from "./product"
import { Command } from "./command"

class Borrow  extends Command{}

const borrows = [
    new Borrow({date: Date.now(), user: users[0], products: [{product: ListProducts[1], quantity: 10}, {product: ListProducts[2], quantity: 10}, {product: ListProducts[3], quantity: 10}]}),
    new Borrow({date: Date.now(), user: users[2], products: [{product: ListProducts[0], quantity: 10}, {product: ListProducts[0], quantity: 10}]}),
    new Borrow({date: Date.now(), user: users[3], products: [{product: ListProducts[5], quantity: 10}, {product: ListProducts[2], quantity: 10}]}),
    new Borrow({date: Date.now(), user: users[0], products: [{product: ListProducts[4], quantity: 10}]}),
]

export { Borrow, borrows }