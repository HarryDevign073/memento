"use client";

import Image from "next/image";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "../ui/avatar";
import likeIcon from "../../public/assets/heart-fill.svg";
import { cn } from "@/lib/utils";

interface LeaderboardItemProps {
	rankingOrder: number;
	userName: string;
	questionCount: number;
	likeCount: number;
	lastIndex?: boolean;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
	rankingOrder,
	userName,
	questionCount,
	likeCount,
	lastIndex = false,
}) => {
	return (
		<div
			className={cn(
				"flex items-center w-full justify-between px-2  ",
				lastIndex ? "border-b-0 pt-3" : "border-b-1 border-neutral-200 py-3"
			)}
		>
			<div className="flex items-center gap-4">
				<div className="text-neutral-900 text-sm font-medium leading-5 ">{rankingOrder}</div>
				<div className="flex items-center gap-3 ">
					<Avatar className="w-10 h-10">
						<AvatarImage src="https://github.com/shadcn.png" />
					</Avatar>
					<div className="flex flex-col">
						<div>{userName}</div>
						<span className="text-neutral-600 text-sm font-normal leading-5">{questionCount} questions</span>
					</div>
				</div>
			</div>
			<div className="flex gap-1.5 ">
				<Image src={likeIcon} alt="liked" />
				<div className="text-neutral-900 text-sm font-medium leading-5">{likeCount}</div>
			</div>
		</div>
	);
};

export default LeaderboardItem;
