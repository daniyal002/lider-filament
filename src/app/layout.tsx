import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import InstallBootstrap from "@/components/InstallBootstrap";
import QueryClientContextProvider from "./QueryClientContextProvider";
import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";
import { baseURL } from "@/api/interseptors";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Лидер-В",
  description: "ООО «Лидер-В» - производитель филамента для 3D печати",
  metadataBase: new URL(baseURL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="GGkAhooQQ8ZDpjP1rTj9umTxLNxawpq2BjV53QzrQZs" />
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
