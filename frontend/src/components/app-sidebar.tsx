import { Calendar, CircleDollarSign, ClipboardList, Handbag, Info, LayoutDashboard, LogOut, Settings, UsersRound } from "lucide-react"
import { logout } from "@/app/auth/logout"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    useSidebar
} from "@/components/ui/sidebar"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuth } from "@/context/authContext"
import { set } from "date-fns"

// Menu items.
const items = [
    {
        title: "Inventaire",
        url: "#",
        icon: ClipboardList,
    },
    {
        title: "Budget",
        url: "#",
        icon: CircleDollarSign,
    },
    {
        title: "Calendrier",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Membres",
        url: "#",
        icon: UsersRound,
    },
    {
        title: "Boutique",
        url: "#",
        icon: Handbag,
    },
    {
        title: "A propos",
        url: "#",
        icon: Info,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export function AppSidebar() {

    const { state } = useSidebar();
    const navigate = useRouter();
    const { setUser } = useAuth();
    const toastId = "nav-bar";

    return (
        <Sidebar collapsible="icon" className="border-none rounded-r-lg">
            <SidebarHeader className={`transition-all duration-300 ${state === "collapsed" ? "opacity-0" : ""}`}>
                <SidebarMenuButton asChild>
                    <a className="flex items-center gap-0 sm:mt-[20px] ">
                        <Image priority src="/img/usi.svg" alt="usi-icon" width={300} height={300} />
                    </a>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className={`my-[16px] ${state === "collapsed" ? "hidden" : ""}`}>
                        <div className="flex items-center gap-2 bg-transparent">
                            <LayoutDashboard size={16} color="#000000" />
                            <span>{"Tableau de bord"}</span>
                        </div>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="flex flex-col gap-2.5">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton className="hover:bg-background" asChild>
                                        <a
                                            href={item.url}
                                            className="relative flex items-center pl-2  py-[10px]
                                                before:content-[''] before:absolute before:left-0 before:top-0
                                                before:h-full before:w-1 before:rounded-tr-md before:rounded-br-md
                                                before:bg-blue-500 before:opacity-0 before:transition-opacity before:duration-300
                                                hover:before:opacity-100 rounded-none h-full">
                                            <item.icon className="in-[a:hover]:text-primary w-[50px] h-[50px]" />
                                            <span className=" in-[a:hover]:text-primary text-sm">{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                        </SidebarMenu>
                    </SidebarGroupContent>

                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenuButton className="hover:bg-background" asChild>
                    <a onClick={async () => {
                        toast.loading("Déconnexion en cours...", { id: toastId });
                        await logout(navigate, setUser);
                        toast.success("Déconnexion réussie", { id: toastId });
                    }}
                        href={"#"}
                        className="relative flex items-center pl-2  py-[10px]
                                                before:content-[''] before:absolute before:left-0 before:top-0
                                                before:h-full before:w-1 before:rounded-tr-md before:rounded-br-md
                                                before:bg-blue-500 before:opacity-0 before:transition-opacity before:duration-300
                                                hover:before:opacity-100 rounded-none h-full mb-[12px]">
                        <LogOut className="in-[a:hover]:text-primary w-[50px] h-[50px]" />
                        <span className=" in-[a:hover]:text-primary">Déconnexion</span>
                    </a>
                </SidebarMenuButton>
            </SidebarFooter>
        </Sidebar>
    )
}