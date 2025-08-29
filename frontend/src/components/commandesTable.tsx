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
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { api } from "@/api/api";
import { Command } from "@/types/commands";

export default function CommandesTable() {

    const [loading, setLoading] = useState(true);
    const [commands, setCommands] = useState<Command[]>([]);

    async function getCommandes() {
        const response = await api.get("/get_commands");
        const data: Command[] = response.data;
        return data;
    }

    useEffect(() => {
        setLoading(true);
        getCommandes()
            .then((data: Command[]) => {
                setCommands(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching commandes:", error);
            });
    }, []);

    return (
        <div className="bg-card rounded-xl flex flex-col gap-4 p-4 h-[400px]">
            <div className="flex flex-row items-center justify-between">
                <h2 className="text-xl font-semibold">Commandes</h2>
                <Button><CirclePlus /> Ajouter</Button>
                {/* <div className="group flex flex-row items-center gap-2 border-border border-1 px-4 py-1.5 rounded-lg focus-within:border-primary">
                    <label htmlFor="search"><Search size={20} className="text-muted-foreground group-focus-within:text-primary" /></label>
                    <input type="search" name="search" id="search" className="outline-none" />
                </div> */}
            </div>
            <div className="flex flex-row items-end justify-between w-2/3 bg-background rounded-lg py-2 px-4">
                <div className="flex flex-col">
                    <p className="text-sm text-muted-foreground">Coût total</p>
                    <p className="text-lg font-semibold">$ 0.00</p>
                </div>
                <Banknote className="text-primary" size={32} />
            </div>
            <Table>
                <TableCaption><Button>Voir plus</Button></TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="sticky top-0 z-10 text-muted-foreground bg-primary-foreground">ID</TableHead>
                        <TableHead className="sticky top-0 z-10 text-muted-foreground bg-primary-foreground">Prix</TableHead>
                        <TableHead className="sticky top-0 z-10 text-muted-foreground bg-primary-foreground">Quantité</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading
                        ? (
                            <>
                                <TableRow className="hover:bg-transparent">
                                    <TableCell><div className="flex flex-row gap-0.5 items-center"><Skeleton className="w-[20px] h-[20px] rounded-full" /><Skeleton className="w-[100px] h-[20px]" /></div></TableCell>
                                    <TableCell><Skeleton className="w-[50px] h-[20px]" /></TableCell>
                                    <TableCell><Skeleton className="w-[50px] h-[20px]" /></TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-transparent">
                                    <TableCell><div className="flex flex-row gap-0.5 items-center"><Skeleton className="w-[20px] h-[20px] rounded-full" /><Skeleton className="w-[100px] h-[20px]" /></div></TableCell>
                                    <TableCell><Skeleton className="w-[50px] h-[20px]" /></TableCell>
                                    <TableCell><Skeleton className="w-[50px] h-[20px]" /></TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-transparent">
                                    <TableCell><div className="flex flex-row gap-0.5 items-center"><Skeleton className="w-[20px] h-[20px] rounded-full" /><Skeleton className="w-[100px] h-[20px]" /></div></TableCell>
                                    <TableCell><Skeleton className="w-[50px] h-[20px]" /></TableCell>
                                    <TableCell><Skeleton className="w-[50px] h-[20px]" /></TableCell>
                                </TableRow>
                            </>
                        )
                        : (
                            commands.map((command) => (
                                <TableRow key={command._id} className="hover:bg-transparent">
                                    <TableCell><div className="flex flex-row gap-0.5 items-center w-full"><ShoppingBag className="text-primary" />{command._id.slice(0, 13)}...</div></TableCell>
                                    <TableCell>{
                                        command.ListCommand.reduce((acc, item) => acc + item.product_id.price * item.quantity, 0)
                                    }$</TableCell>
                                    <TableCell>&lt; {
                                        command.ListCommand.reduce((acc, item) => acc + item.quantity, 0)
                                    } &gt;</TableCell>
                                </TableRow>
                            ))
                        )}
                </TableBody>
            </Table>
        </div>
    )
}
