"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";

import questionIcon from "@/public/assets/file-question.svg";
import likeIcon from "@/public/assets/heart.svg";
import playIcon from "@/public/assets/play.svg";

import { Button } from "../ui/button";

import AuthorItem from "./AuthorItem";

import { URLS } from "@/constants/urls";

interface QuizInteractionProps {
	quizId: number;
	authorName: string;
	authorNameAbbre: string;
	occupation: string;
	questionCount: number;
	likeCount: number;
	playCount: number;
	editable?: boolean;
}

const QuizInteraction: React.FC<QuizInteractionProps> = ({
	quizId,
	authorName,
	authorNameAbbre,
	occupation,
	questionCount,
	likeCount,
	playCount,
	editable,
}) => {
	const router = useRouter();

	const handlePlayQuizz = () => {
		console.log("play quizz");
		router.push(`${URLS.PLAY_QUIZZES}/${quizId}`);
	};

	return (
		<div className="flex justify-between items-center self-stretch">
			<div className="flex gap-3 ">
				<div className="flex gap-1.5 items-center">
					<Image src={questionIcon} alt="questionIcon" />
					<span className="text-neutral-600 text-base font-medium leading-6">{questionCount}</span>
				</div>
				<div className="flex gap-1.5 items-center">
					<Image src={likeIcon} alt="likeIcon" />
					<span className="text-neutral-600 text-base font-medium leading-6">{likeCount}</span>
				</div>
				<div className="flex gap-1.5 items-center">
					<Image src={playIcon} alt="playIcon" />
					<span className="text-neutral-600 text-base font-medium leading-6">{playCount}</span>
				</div>
				{editable && <AuthorItem authorName={authorName} authorNameAbbre={authorNameAbbre} occupation={occupation} />}
			</div>

			<Button
				className="hidden md:flex items-center gap-2 text-sm"
				onClick={(e) => {
					e.stopPropagation();
					handlePlayQuizz();
				}}
			>
				<Play size={18} /> Play
			</Button>
		</div>
	);
};

export default QuizInteraction;
