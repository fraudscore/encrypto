import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";
import NavBar from "./components/NavBar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Encrypto",
  description: "Secure datatransfer",
  icons: {
      icon: "/img/logo.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NextUIProvider>
        <NavBar/>
          {children}
      </NextUIProvider>
    </body>
    </html>
  );
}
