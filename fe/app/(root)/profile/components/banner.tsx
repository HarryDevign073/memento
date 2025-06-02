"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Edit } from "lucide-react";

import { useUser } from "@/context/user-context";

import BannerImage from "@/public/background/default-profile-cover-bg.png";

import UpsertUserDialog from "./upsert-user-dialog";

const Banner = () => {
	const { currentUser } = useUser();

	const [upsertUserDialog, setUpsertUserDialog] = useState<boolean>(false);

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
		<>
			<div className="relative">
				<Image src={BannerImage} alt="banner" className="w-full h-[300px] object-cover" width={100} height={300} />
				<div className="absolute left-8 top-[85%] flex items-center gap-8">
					<div className="w-40 h-40 flex items-center justify-center rounded-full bg-neutral-100 border border-neutral-200">
						<h1 className="font-semibold text-[60px] text-neutral-500 uppercase">{displayedName}</h1>
					</div>

					<div>
						<div className="font-semibold text-[30px] text-neutral-900">{fullName}</div>
						{currentUser?.user?.user_occupation && (
							<div className="text-base text-neutral-600">
								{currentUser.user.user_occupation.charAt(0).toUpperCase() + currentUser.user.user_occupation.slice(1)}
							</div>
						)}
					</div>
				</div>

				<button
					className="absolute right-8 top-[calc(100%+20px)] border border-neutral-200 outline-none bg-white rounded-md p-2 hover:bg-neutral-100 cursor-pointer"
					onClick={() => setUpsertUserDialog(true)}
				>
					<Edit className="text-neutral-700" size={20} />
				</button>
			</div>

			<UpsertUserDialog
				open={upsertUserDialog}
				onClose={() => setUpsertUserDialog(false)}
				userDetails={currentUser?.user}
			/>
		</>
	);
};

export default Banner;
