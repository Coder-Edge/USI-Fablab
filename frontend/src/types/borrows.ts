import { Product } from "./products";


export interface Borrow {
    id: string;
    startDate: Date;
    endDate: Date;
    motif: string;
    status: "en attente" | "accepté" | "rejeté";
    user: {
        name: (string | null);
        firstname: (string | null);
        email: string;
    };
    ListCommand: [
        {
            product_id: Product;
            quantity: number;
        }
    ]
}