import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Educonnect",
  description: "Red social educativa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='es'>
        <body className={inter.className}>
          <div className='w-full bg-BlackCalido px-4 md:px-8 lg:px-16 xl:px-20 border border-BorderColor'>
            <Navbar />
          </div>
          <div className=' bg-BlackOscuro px-4 md:px-8 lg:px-16 xl:px-20'>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
