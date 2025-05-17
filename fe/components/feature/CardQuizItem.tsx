import React from "react";
import { Heart } from "lucide-react";

import QuizStatus from "./QuizStatus";
import QuizOption from "./QuizOption";
import QuizInteraction from "./QuizInteraction";
import { ICardQuizz } from "./CardQuizProps";

const CardQuizItem: React.FC<ICardQuizz> = ({
	quizId,
	quizTitle,
	quizDesc,
	questionCount,
	likeCount,
	playCount,
	isActive,
	authorName,
	authorNameAbbre,
	authorQuizCount,
	authorLikeCount,
	occupation,
	editable,
	layout = "card",
	isLiked,
	onInteract,
}) => {
	return (
		<div className="p-3 rounded-md border border-neutral-200 bg-white hover-animation relative">
			<QuizStatus isActive={isActive} editable={editable} layout={layout} />

			{!editable && (
				<button
					className="border-0 outline-none absolute top-5 right-5 cursor-pointer text-white hover:text-pink-400 transition-all duration-200"
					onClick={() => onInteract && onInteract(isLiked ? "unlike" : "like")}
				>
					<Heart size={20} />
				</button>
			)}

			<div className="flex flex-col gap-2 md:justify-between w-full relative p-2 ">
				<div>
					<div className="w-full flex items-center justify-between gap-5 relative">
						<div className="section-title line-clamp-1">{quizTitle}</div>

						<QuizOption editable={editable} />
					</div>
					<p className="text-neutral-600 text-ellipsis line-clamp-2 text-sm font-normal leading-5">{quizDesc}</p>
				</div>

				<QuizInteraction
					quizId={quizId}
					authorName={authorName}
					authorNameAbbre={authorNameAbbre}
					occupation={occupation}
					authorQuizCount={authorQuizCount}
					authorLikeCount={authorLikeCount}
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
