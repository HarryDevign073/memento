export interface ICardQuizz {
	quizId: number;
	quizTitle: string;
	quizDesc: string;
	questionCount: number;
	likeCount: number;
	playCount: number;
	isActive: boolean;
	authorName: string;
	authorNameAbbre: string;
	authorQuizCount: number;
	authorLikeCount: number;
	occupation: string;
	editable?: boolean;
	layout?: "card" | "list";

	isLiked?: boolean;
	onInteract?: (option: "like" | "unlike") => void;
}
