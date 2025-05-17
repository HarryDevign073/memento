import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import ToastContextProvider from "@/context/toast-context";
import LoadingContextProvider from "@/context/loading-context";
import UserContextProvider from "@/context/user-context";

import MainLayout from "@/components/MainLayout";

import "./globals.css";

import SubLayout from "./sub-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Memento",
	description: "Description",
};

export interface PageParams {
	children: React.ReactNode;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<LoadingContextProvider>
					<MainLayout>
						<NuqsAdapter>
							<ToastContextProvider>
								<UserContextProvider>
									<SubLayout>{children}</SubLayout>
								</UserContextProvider>
							</ToastContextProvider>
						</NuqsAdapter>
					</MainLayout>
				</LoadingContextProvider>
			</body>
		</html>
	);
}
