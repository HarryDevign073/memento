import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";
import Sidebar from "@/components/Sidebar";
import MobileMenu from "@/components/MobileMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Memento",
	description: "Description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="relative flex flex-row h-screen bg-[#F9FAFB]">
					<Sidebar />
					<section className="flex flex-col w-full overflow-auto p-5 gap-5">
						<div className="h-full w-full">{children}</div>
					</section>
					<MobileMenu />

					{/* @ts-ignore */}
				</main>
			</body>
		</html>
	);
}