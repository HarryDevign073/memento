import { QuizzVisibility } from "@/types/quizz";

export interface ICardQuizz {
	quizId: number;
	quizTitle: string;
	quizDesc: string;
	questionCount: number;
	likeCount: number;
	playCount: number;
	authorName: string;
	authorNameAbbre: string;
	// authorQuizCount: number;
	// authorLikeCount: number;
	occupation: string;
	editable?: boolean;
	status: QuizzVisibility;
	layout?: "card" | "list";
	isLiked?: boolean;

	onInteract?: (option: "like" | "unlike") => void;
}
