"use client";

import React from "react";
import { useRouter } from "next/navigation";

import QuizStatus from "./QuizStatus";
import QuizOption from "./QuizOption";
import QuizInteraction from "./QuizInteraction";
import { ICardQuizz } from "./CardQuizProps";
import StatusBadge from "../custom/StatusBadge";
import HeartIcon from "../icons/heart";

import { cn } from "@/lib/utils";
import { URLS } from "@/constants/urls";

const CardQuizItem: React.FC<ICardQuizz> = ({
	quizId,
	quizTitle,
	quizDesc,
	questionCount,
	likeCount,
	playCount,
	authorName,
	authorNameAbbre,
	occupation,
	editable,
	status,
	layout = "card",
	isLiked,
	canInteract = true,
	onInteract,
}) => {
	const router = useRouter();

	const onNavigateQuizz = () => {
		router.push(`${URLS.QUIZZES}/${quizId}`);
	};

	return (
		<div
			className="p-3 rounded-md border border-neutral-200 bg-white hover-animation relative"
			onClick={onNavigateQuizz}
		>
			<QuizStatus status={status} layout={layout} />

			{!editable && canInteract && (
				<button
					className={cn(
						"border-0 outline-none absolute top-5 right-5 cursor-pointer hover:opacity-80 transition-all duration-200"
					)}
					onClick={(e) => {
						e.stopPropagation();
						if (onInteract) {
							onInteract(isLiked ? "unlike" : "like");
						}
					}}
				>
					<HeartIcon size={20} active={isLiked} />
				</button>
			)}

			<div className="flex flex-col gap-2 md:justify-between w-full relative p-2 ">
				<div>
					<div className="w-full flex items-center justify-between gap-5 relative">
						<div className="section-title line-clamp-1">{quizTitle}</div>

						<div className="flex items-center gap-2">
							{editable && <StatusBadge status={status} />}
							<QuizOption
								editable={editable}
								quizId={quizId}
								quizz={{
									name: quizTitle,
									description: quizDesc,
									visibility: status,
								}}
							/>
						</div>
					</div>
					<p className="text-neutral-600 text-ellipsis line-clamp-2 text-sm font-normal leading-5">{quizDesc}</p>
				</div>

				<QuizInteraction
					quizId={quizId}
					authorName={authorName}
					authorNameAbbre={authorNameAbbre}
					occupation={occupation}
					questionCount={questionCount}
					likeCount={likeCount}
					playCount={playCount}
					editable={editable}
				/>
			</div>
		</div>
	);
};

export default CardQuizItem;
