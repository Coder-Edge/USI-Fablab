import { api } from "@/api/api";
import { User } from "@/types/users";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function logout(router: AppRouterInstance, setUser: (user: (User | null)) => void): Promise<boolean> {

    let response: {data: (object | null)} = {data: null};

    try {
        response = await api.post("/users/logout") as {data: (object | null)};
        setUser(null);
        response.data && router.push("/auth/login");

    } catch(e) {
        console.error("Error logging out:", e);
    }
    return response.data ? true: false
}
