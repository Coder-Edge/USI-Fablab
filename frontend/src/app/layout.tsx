
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import { AuthProvider } from "@/context/authContext";

const lexend = Lexend({
  variable: "--font-lexend",
  weight: ["400", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "USI-Fablab",
  description: "Gestionnaire des équipements",
  icons: {
    icon: "/icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html>
      <body
        className={`${lexend.variable} antialiased w-screen h-screen`}
      >
        <AuthProvider>
          {children}
          <Toaster position="bottom-right" closeButton richColors toastOptions={{ duration: 4000 }} expand />
        </AuthProvider>
      </body>
    </html>
  );
}
