"use client"
import { api } from "@/api/api";
import { useAuth } from "@/context/authContext";
import { User } from "@/types/users";
import { useRouter } from "next/navigation";
import * as React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="h-screen lg:max-w-[calc(100%-var(--sidebar-width))] overflow-x-hidden">
                <SidebarTrigger className="hover:bg-primary/90" />
                <div className="sm:px-[20px] px-[10px] w-full h-full">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
}
