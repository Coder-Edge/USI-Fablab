"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import * as React from "react"
import Link from 'next/link';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { User } from '@/types/users';
import { redirectUserToLogin } from '../utils';


export default function LoginPage() {

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const formRef = React.useRef<HTMLFormElement>(null);

    const navigate = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation()

        const toastId = "login"
        // Handle login logic here
        const formData = new FormData(formRef.current as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email) {toast.error("Veuillez sassir votre email", {id: toastId}); return}
        if (!password) {toast.error("Veuillez sassir votre mot de passe", {id: toastId}); return}

        toast.loading("Connexion en cours...", {id: toastId, style: {border: "none"}});

        setIsLoading(true);

        try {
            const response = await api.post("/users/login", { email, password }, {withCredentials: true});
            redirectUserToLogin(response.data.user as User, navigate);
            toast.success("Connexion réussie", {id: toastId});
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                // Handle specific error messages
                if (error.response.data.email) {
                    toast.error("Email incorrect", {id: toastId});
                }
                if (error.response.data.password) {
                    toast.error("Mot de passe incorrect", {id: toastId});
                }
            } else {
                toast.error("Erreur de connexion", {id: toastId});
            }
            setIsLoading(false);
        }

        // (formRef.current as HTMLFormElement).reset();
    };

    return (
        <form className="bg-primary-foreground p-8 flex flex-col gap-4 rounded-lg md:rounded-l-none md:rounded-r-lg w-[400px] h-fit" onSubmit={handleSubmit} ref={formRef}>
            <h2 className="text-center text-2xl text-primary">{"CONNEXION"}</h2>
            <div className="grid w-full items-center gap-3 relative">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Ex: remile@gmail.com" name='email' />
            </div>
            <div className="grid w-full items-center gap-3">
                <Label htmlFor="password">Mot de Passe</Label>
                <Input type="password" id="password" name='password' />
            </div>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-1">
                    <Checkbox id="reminder" />
                    <Label htmlFor="reminder" className="font-normal">Se souvenir de moi</Label>
                </div>
                <Button variant="link" className="font-normal">Mot de passe oublié ?</Button>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>{"Se connecter"}</Button>
            <p className='text-center text-sm'>Pas de compte ? <Button variant="link" className="font-normal mx-0" asChild><Link href="/auth/signup">Créer un compte</Link></Button></p>
        </form>
    );
}