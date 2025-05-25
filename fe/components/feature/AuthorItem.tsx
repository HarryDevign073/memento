import React, { useMemo } from "react";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface AuthorItemProps {
	authorName: string;
	authorNameAbbre: string;
	occupation: string;
}

const AuthorItem: React.FC<AuthorItemProps> = ({ authorName, authorNameAbbre, occupation }) => {
	const shortHandName = useMemo(() => {
		if (!authorName && !authorNameAbbre) return "";
		if (authorName && !authorNameAbbre) return authorName[0];
		if (!authorName && authorNameAbbre) return authorNameAbbre[0];
		return `${authorName[0]}${authorNameAbbre[0]}`;
	}, [authorName, authorNameAbbre]);
	const fullName = useMemo(() => `${authorName} ${authorNameAbbre}`, [authorName, authorNameAbbre]);

	return (
		<div className="flex justify-center items-center gap-2">
			<HoverCard>
				<HoverCardTrigger asChild>
					<div className="flex justify-center items-center w-6 h-6 text-white rounded-full text-xs font-bold bg-primary/15 cursor-pointer">
						<div className="mx-auto text-primary text-xs uppercase">{shortHandName.toUpperCase()}</div>
					</div>
				</HoverCardTrigger>
				<HoverCardContent className="w-80 flex flex-col items-start gap-4">
					<div className="flex justify-center items-center gap-3">
						<div className="flex justify-center items-center w-11 h-11 text-white rounded-full text-xs font-bold bg-primary/15 cursor-pointer">
							<div className="mx-auto text-primary text-lg">{shortHandName.toUpperCase()}</div>
						</div>
						<div className="flex flex-col">
							<div className="text-neutral-900 text-base font-medium leading-6">{fullName}</div>
							{occupation && (
								<div className="text-neutral-600 text-ellipsis line-clamp-2 text-sm font-normal leading-5">
									{occupation}
								</div>
							)}
						</div>
					</div>
				</HoverCardContent>
			</HoverCard>
		</div>
	);
};

export default AuthorItem;
