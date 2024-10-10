import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import InstallBootstrap from "@/components/InstallBootstrap";
import QueryClientContextProvider from "./QueryClientContextProvider";
import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Лидер-В",
  description: "ООО «Лидер-В» - производитель филамента для 3D печати",
  metadataBase: new URL("http://192.168.30.153:8001"),

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <QueryClientContextProvider>
        <InstallBootstrap />
        <body className={inter.className}>
          <Header />
          <main className="main">
          {children}
          </main>
          <Footer/>
        </body>
      </QueryClientContextProvider>
    </html>
  );
}
