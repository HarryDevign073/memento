"use client";

import { useMemo } from "react";
import Image from "next/image";

import { useUser } from "@/context/user-context";

import BannerImage from "@/public/background/default-profile-cover-bg.png";

const Banner = () => {
	const { currentUser } = useUser();

	const displayedName = useMemo(() => {
		if (!currentUser?.user?.user_first_name || !currentUser?.user?.user_last_name) return "";

		const fullName = `${currentUser.user.user_first_name[0]}${currentUser?.user?.user_last_name[0]}`;
		return fullName;
	}, [currentUser]);

	const fullName = useMemo(() => {
		if (!currentUser?.user?.user_first_name || !currentUser?.user?.user_last_name) return "";

		return `${currentUser.user.user_first_name} ${currentUser?.user?.user_last_name}`;
	}, [currentUser]);

	return (
		<div className="relative">
			<Image src={BannerImage} alt="banner" className="w-full h-[300px] object-cover" width={100} height={300} />
			<div className="absolute left-8 top-[85%] flex items-center gap-8">
				<div className="w-40 h-40 flex items-center justify-center rounded-full bg-neutral-100 border border-neutral-200">
					<h1 className="font-semibold text-[60px] text-neutral-500 uppercase">{displayedName}</h1>
				</div>

				<div>
					<div className="font-semibold text-[30px] text-neutral-900">{fullName}</div>
					{/* We should get from BE */}
					<div className="text-base text-neutral-600">Designer</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
