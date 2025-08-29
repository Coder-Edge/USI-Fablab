"use client"
import { useAuth } from "@/context/authContext";
import { useEffect } from "react";


export default function Home() {

  const { user } = useAuth();

  useEffect(() => {
    // Perform side effects here
    console.log(user);
  }, [user]);

  return (
    <main>
      <h1>Welcome to the Home Page</h1>
    </main>
  );
}
