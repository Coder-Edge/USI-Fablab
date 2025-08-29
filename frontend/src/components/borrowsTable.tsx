import { Banknote, CirclePlus, Search, ShoppingBag } from "lucide-react";
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

export default function BorrowsTable() {

    return (
        <div className="bg-card rounded-xl flex flex-col gap-4 p-4 h-[400px]">
            <div className="flex flex-row items-center justify-between">
                <h2 className="text-xl font-semibold">Emprunts</h2>
                <div className="group flex flex-row items-center gap-2 border-border border-1 px-4 py-1.5 rounded-lg focus-within:border-primary">
                    <label htmlFor="search"><Search size={20} className="text-muted-foreground group-focus-within:text-primary" /></label>
                    <input type="search" name="search" id="search" className="outline-none" />
                </div>
            </div>
            <Table>
                <TableCaption><Button>Voir plus</Button></TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="sticky top-0 z-10 text-muted-foreground">ID</TableHead>
                        <TableHead className="sticky top-0 z-10 text-muted-foreground">Emprunteur</TableHead>
                        <TableHead className="sticky top-0 z-10 text-muted-foreground">Qauntité</TableHead>
                        <TableHead className="sticky top-0 z-10 text-muted-foreground">Durée de l'emprunt</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell><div className="flex flex-row gap-0.5 items-center"><ShoppingBag className="text-primary"/>INNZ5524842572475674567</div></TableCell>
                        <TableCell>Remile Bianga</TableCell>
                        <TableCell>&lt; 100 &gt;</TableCell>
                        <TableCell>Du 16/10/2020 au 16/20/2025</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}