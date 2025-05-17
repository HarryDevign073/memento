"use client";

import { usePathname } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import MobileMenu from "@/components/MobileMenu";

import { URLS } from "@/constants/urls";

const SubLayout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();

	if ([URLS.AUTH.SIGN_IN, URLS.AUTH.SIGN_UP].includes(pathname)) {
		return <div className="w-full h-full">{children}</div>;
	}

	return (
		<main className="relative h-screen flex flex-row bg-[#F9FAFB]">
			<Sidebar />

			<section className="flex flex-col w-full overflow-auto p-5 gap-5 ml-0 md:ml-[260px]">
				<div className="h-full w-full">{children}</div>
			</section>
			<MobileMenu />
		</main>
	);
};

export default SubLayout;
