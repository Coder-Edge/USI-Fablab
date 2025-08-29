"use client"

import { checkAuth, redirectUserToLogin } from "@/app/auth/utils";
import Loading from "@/app/loading";
import { User } from "@/types/users";
import { useRouter } from "next/navigation";
import * as React from "react";


interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [user, setUser] = React.useState<User | null>(null);

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const navigate = useRouter();

    React.useEffect(() => {

        async function checkUserAuth() {
            setIsLoading(true);
            const isAuth = await checkAuth(setUser);
            if (!isAuth) {
                navigate.push("/auth/login");
            }
            setIsLoading(false);
        }

        checkUserAuth();
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {isLoading ? <Loading /> : children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
