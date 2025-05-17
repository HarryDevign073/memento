import React from "react";
import type { Metadata } from "next";

import "../globals.css";

export const metadata: Metadata = {
	title: "Memento",
	description: "Description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <div className="w-full h-full">{children}</div>;
}
