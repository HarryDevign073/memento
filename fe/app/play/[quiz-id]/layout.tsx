import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memento",
  description: "Description",
};

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className={`${inter.className} h-screen w-screen bg-[#F9FAFB]`}>
          {children}
        </main>
      </body>
    </html>
  );
}
