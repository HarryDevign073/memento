import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "../globals.css";
import Sidebar from "@/components/Sidebar";
import MobileMenu from "@/components/MobileMenu";
import MainLayout from "@/components/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Memento",
	description: "Description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<MainLayout>
			<html lang="en">
				<body className={inter.className}>
					<NuqsAdapter>
						<main className="relative flex flex-row h-screen bg-[#F9FAFB]">
							<Sidebar />
							<section className="flex flex-col w-full overflow-auto p-5 gap-5">
								<div className="h-full w-full">{children}</div>
							</section>
							<MobileMenu />
						</main>
					</NuqsAdapter>
				</body>
			</html>
		</MainLayout>
	);
}