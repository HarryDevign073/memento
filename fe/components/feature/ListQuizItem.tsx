"use client";

import { useRouter } from "next/navigation";

import QuizStatus from "./QuizStatus";
import QuizOption from "./QuizOption";
import QuizInteraction from "./QuizInteraction";
import { ICardQuizz } from "./CardQuizProps";
import StatusBadge from "../custom/StatusBadge";
import HeartIcon from "../icons/heart";

import { URLS } from "@/constants/urls";

const ListQuizItem: React.FC<ICardQuizz> = ({
	quizTitle,
	quizDesc,
	questionCount,
	likeCount,
	playCount,
	authorName,
	authorNameAbbre,
	occupation,
	editable,
	quizId,
	status,
	layout = "list",
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
			className="bg-white md:h-[120px] rounded-md border border-neutral-200 pl-3 md:pl-2 pr-3 py-3 md:py-2 flex flex-col md:flex-row gap-2 md:gap-4 relative cursor-pointer transition-transform duration-300 hover:-translate-y-[3px] hover:scale-[1.002] hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)]"
			onClick={onNavigateQuizz}
		>
			<QuizStatus status={status} layout={layout} />

			<div className="flex flex-col gap-2 px-2 md:px-0 md:gap-0 md:justify-between w-full relative">
				<div>
					<div className="w-full flex items-center justify-between gap-5">
						<div className="section-title line-clamp-1">{quizTitle}</div>

						<div className="flex items-center gap-2">
							{!editable && canInteract ? (
								<button
									className="hidden md:block border-0 outline-none cursor-pointer hover:opacity-80 transition-all duration-200"
									onClick={(e) => {
										e.stopPropagation();
										if (onInteract) {
											onInteract(isLiked ? "unlike" : "like");
										}
									}}
								>
									<HeartIcon size={20} active={isLiked} isGray={layout == "list"} />
								</button>
							) : (
								<StatusBadge status={status} />
							)}

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

export default ListQuizItem;
