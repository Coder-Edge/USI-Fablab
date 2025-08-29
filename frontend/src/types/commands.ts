import { Product } from "./products";
import { User } from "./users";


export interface Command {
    _id: string;
    startDate: Date;
    status: "en attente" | "accepté" | "rejeté";
    user: User;
    ListCommand: [
        {
            product_id: Product;
            quantity: number;
        }
    ]
}