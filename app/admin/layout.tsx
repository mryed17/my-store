import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "../globals.css";
import Navbar from "./components/navbar";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Toko Online",
  description: "Admin Toko Online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
