import React, { Suspense } from "react";
import type { Metadata } from "next";

import GlobalLoading from "@/app/loading";

export const metadata: Metadata = {
	title: "Memento - Play Quizz",
	description: "Description",
};

interface Props {
	children: React.ReactNode;
	params: {
		id: string;
	};
}

export default async function PlayQuizzLayout({ children }: Props) {
	return (
		<Suspense fallback={<GlobalLoading />}>
			<div className="w-full h-full">{children}</div>
		</Suspense>
	);
}
