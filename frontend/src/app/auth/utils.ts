import { api } from "@/api/api";
import { Role, User } from "@/types/users";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


export async function checkAuth(setUser: (user: User) => void): Promise<(boolean | User)> {

    try {
        const response = await api.get("/users/user");
        const user: User = response.data.user;
        setUser(user);
        return user;

        // Handle successful authentication
    } catch (error) {
        return false;
    }
}

export async function redirectUserToLogin(user: User, router: AppRouterInstance) {
    if (user) {
        switch (user.userType) {
            case Role.manager:
            case Role.member:
                router.push("/pages/admin");
                break;
            case Role.student:
                router.push("/pages/fablab");
                break;
            default:
                router.push("/auth/login");
        }
    } else {
        router.push("/auth/login");
    }
}
