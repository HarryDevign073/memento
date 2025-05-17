import React, { Suspense } from "react";
import type { Metadata } from "next";

import GlobalLoading from "@/app/loading";

export const metadata: Metadata = {
	title: "Memento - Profile",
	description: "Description",
};

interface Props {
	children: React.ReactNode;
}

export default async function ProfileLayout({ children }: Props) {
	return (
		<Suspense fallback={<GlobalLoading />}>
			<div className="w-full h-full">{children}</div>
		</Suspense>
	);
}
