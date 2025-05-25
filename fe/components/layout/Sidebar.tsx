"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";

import { useLoadingContext } from "@/context/loading-context";

import { logout } from "@/actions/auth";

import logo from "@/public/assets/logo.svg";

import { sidebarLinks } from "@/constants";
import { URLS } from "@/constants/urls";

const Sidebar = () => {
	const router = useRouter();
	const pathname = usePathname();
	const { setLoading } = useLoadingContext();

	const handleLogout = async () => {
		setLoading(true);
		await logout();
		router.push(URLS.AUTH.SIGN_IN);
		setLoading(false);
	};

	return (
		<section className="fixed left-0 top-0 bottom-0 custom-scrollbar w-[260px] bg-white py-8 px-4 md:flex flex-col gap-6 hidden border-r border-neutral-200">
			<Image src={logo} alt="logo" />
			<div className="flex w-full flex-1 flex-col gap-1">
				{sidebarLinks.map((link) => {
					const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

					//   if (link.route === "/profile") link.route = `${link.route}/${userId}`;

					return (
						<Link
							href={link.route}
							key={link.label}
							className={`flex gap-2 px-3 py-2 rounded-md hover:bg-neutral-50 ${isActive && "bg-neutral-50"}`}
						>
							<Image src={link.imgURL} alt={link.label} width={24} height={24} />

							<p className={`text-neutral-600 text-base leading-6 ${isActive && "font-medium text-neutral-800"}`}>
								{link.label}
							</p>
						</Link>
					);
				})}
			</div>

			<button
				className="flex gap-2 px-3 py-2 rounded-md hover:bg-neutral-50 text-neutral-600 border-0 outline-none"
				onClick={handleLogout}
			>
				<LogOutIcon className="w-5 h-5" />
				<p className="text-base leading-6">Logout</p>
			</button>
		</section>
	);
};

export default Sidebar;
