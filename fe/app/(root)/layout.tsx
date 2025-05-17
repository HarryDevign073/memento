import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Memento - Quizzes",
	description: "Description",
};

export default function QuizzLayout({ children }: { children: React.ReactNode }) {
	return <div className="w-full h-full">{children}</div>;
}
