"use client" 
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from "lucide-react"
import * as React from 'react';
import Link from 'next/link';

export default function LoginPage() {

    const [isLoading, setIsLoading] = React.useState(false);
    const [isAcceptTerms, setIsAcceptTerms] = React.useState(false);

    return (
        <form className="bg-primary-foreground p-8 flex flex-col gap-4 rounded-lg md:rounded-l-none md:rounded-r-lg w-[400px] h-fit">
            <h2 className="text-center text-2xl text-primary">{"CONNEXION"}</h2>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="grid w-full items-center gap-3 relative">
                    <Label htmlFor="firstname">Prénom</Label>
                    <Input type="text" id="firstname" placeholder="Ex: Remile" name='firstname' />
                </div>
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="name">Nom</Label>
                    <Input type="text" id="name" placeholder="Ex: Bianga" name='name' />
                </div>
            </div>
            <div className="grid w-full items-center gap-3">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Ex: remile@gmail.com" name='email' />
            </div>
            <div className="grid w-full items-center gap-3">
                <Label htmlFor="password">Mot de Passe</Label>
                <Input type="password" id="password" placeholder="Mot de Passe" name='password' />
            </div>
            <div className="flex flex-row gap-1 items-center">
                <Checkbox id="reminder" checked={isAcceptTerms} onCheckedChange={(checked) => setIsAcceptTerms(!!checked)} />
                <Label htmlFor="reminder" className="font-normal">J'accepte <Button variant="link" className="font-normal translate-x-[-18px]">les conditions d'utilisation</Button></Label>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || !isAcceptTerms}>{
                isLoading ? <><Loader2Icon className="animate-spin" /> En cours...</> : "Créer un compte"
            }</Button>
            <p className='text-center text-sm'>Déjà un compte ? <Button variant="link" className="font-normal mx-0" asChild><Link href="/auth/login">Se connecter</Link></Button></p>
        </form>
    );
}