import { Banknote, CirclePlus, Search, ShoppingBag, SlidersHorizontal } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button";

export default function StockTable() {

    return (
        <div className="bg-card rounded-xl flex flex-col gap-4 p-4 h-[400px]">
            <div className="flex flex-row items-center justify-between">
                <h2 className="text-xl font-semibold">Stock</h2>
                <div className="group flex flex-row items-center gap-2 border-border border-1 px-4 py-1.5 rounded-lg focus-within:border-primary">
                    <label htmlFor="search"><Search size={20} className="text-muted-foreground group-focus-within:text-primary" /></label>
                    <input type="search" name="search" id="search" className="outline-none" />
                </div>
            </div>
            <div className="flex gap-2 w-[100%] overflow-x-auto">
                <Button variant="secondary"><SlidersHorizontal size={20} className="text-primary" />Filter</Button>
                <Button variant="outline">Microcontrolleur</Button>
                <Button variant="outline">Moteur</Button>
                <Button variant="outline">Lapin</Button>
                <Button variant="outline">Microcontrolleur</Button>
                <Button variant="outline">Microcontrolleur</Button>
                <Button variant="outline">Moteur</Button>
                <Button variant="outline">Lapin</Button>
                <Button variant="outline">Microcontrolleur</Button>
                <Button variant="outline">Microcontrolleur</Button>
                <Button variant="outline">Moteur</Button>
                <Button variant="outline">Lapin</Button>
                <Button variant="outline">Microcontrolleur</Button>
            </div>
            <Table>
                <TableCaption><Button>Voir plus</Button></TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="sticky top-0 z-10 text-muted-foreground">Composant</TableHead>
                        <TableHead className="sticky top-0 z-10 text-muted-foreground">Prix</TableHead>
                        <TableHead className="sticky top-0 z-10 text-muted-foreground">Type</TableHead>
                        <TableHead className="sticky top-0 z-10 text-muted-foreground">Quantité</TableHead>
                        <TableHead className="sticky top-0 z-10 text-muted-foreground">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Remile Bianga</TableCell>
                        <TableCell>Remile Bianga</TableCell>
                        <TableCell>Microcontroleur</TableCell>
                        <TableCell>&lt; 100 &gt;</TableCell>
                        <TableCell>Disponible</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}