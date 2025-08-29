"use client"

import { useAuth } from '@/context/authContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { checkAuth, redirectUserToLogin } from './utils';
import { useState } from 'react';
import * as React from "react"
import Loading from '../loading';

export default function AuthLayout({ children }: { children: React.ReactNode }) {

    const navigate = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {

        async function checkUserAuth() {
            setIsLoading(true);
            const isAuth = await checkAuth(() => {});
            if (isAuth) {
                redirectUserToLogin(isAuth as any, navigate);
            }
            else {
                setIsLoading(false);
            }
        }

        checkUserAuth();
    }, [navigate]);

    return isLoading 
    ? <Loading />
    :(
        <main className="flex items-center justify-center h-screen w-full">
            <div className="md:flex lg:grid lg:grid-cols-2">
                <div className="w-[300] hidden bg-primary md:flex items-center md:justify-center lg:translate-x-[100px] rounded-l-lg md:visible overflow-hidden">
                    <Image
                        src="/img/auth_logo.svg"
                        width={300}
                        height={300}
                        priority
                        alt="Une belle photo"
                    />
                </div>
                {children}
            </div>
        </main>
    );
}