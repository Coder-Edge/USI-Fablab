"use client"
import BorrowsTable from "@/components/borrowsTable";
import CommandesTable from "@/components/commandesTable";
import StockTable from "@/components/stockTable";
import { useAuth } from "@/context/authContext";
import { Bell } from "lucide-react";

export default function Admin() {

    const { user } = useAuth();
    
    return (
        <div className="w-full">
            <div className="flex items-center justify-between w-full mb-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Inventaire</h1>
                <div className="flex flex-row items-center gap-2">
                    <span className="bg-primary-foreground p-2 rounded-md"><Bell size={20} /></span>
                    <div className="flex flex-row items-center gap-1">
                        <span className="font-semibold text-xl bg-primary p-[4px] rounded-md text-primary-foreground">RB</span>
                        <div className="flex flex-col justify-center gap-0">
                            <span className="text-lg font-semibold">Remile Bianga</span>
                            <span className="text-sm text-muted-foreground translate-y-[-4px]">manager</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="xl:grid xl:grid-cols-[1fr_1.5fr] xl:gap-4 flex flex-col gap-4">
                    <CommandesTable />
                    <BorrowsTable />
                </div>
                <StockTable />
            </div>
        </div>
    );
}
