import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingBag, Table } from "lucide-react";

export default function Loading() {
    return (
        <div>
            <h1>Chargement...</h1>
        </div>
    );
}

export function CommandsTableLoader() {
    return (
        <Table className="w-full table-fixed">
            <TableCaption><Button>Voir plus</Button></TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="sticky top-0 z-10 text-muted-foreground">ID</TableHead>
                    <TableHead className="sticky top-0 z-10 text-muted-foreground">Prix</TableHead>
                    <TableHead className="sticky top-0 z-10 text-muted-foreground">Quantité</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <div className="flex flex-row gap-0.5 items-center">
                            <ShoppingBag className="text-primary" />
                            INNZ5524842572475674567
                        </div>
                    </TableCell>
                    <TableCell>200$</TableCell>
                    <TableCell>&lt; 100 &gt;</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
