import BookIcon from "@/components/icons/book";
import { useMemo } from "react";

interface PlayQuizzHeaderProps {
	lengthOfAnswers: number;
	lengthOfQuestions: number;
}

const PlayQuizzHeader: React.FC<PlayQuizzHeaderProps> = ({ lengthOfAnswers, lengthOfQuestions }) => {
	const percentage = useMemo(() => {
		if (!lengthOfQuestions) return 0;

		return (lengthOfAnswers / lengthOfQuestions) * 100;
	}, [lengthOfAnswers, lengthOfQuestions]);

	return (
		<div className="flex items-center gap-5">
			<BookIcon size={32} />
			<div className="bg-neutral-100 rounded-full flex-1 h-2 relative">
				<div
					className="absolute top-0 left-0 h-full rounded-full bg-violet-500"
					style={{ width: `${percentage}%` }}
				></div>
			</div>
			<div className="rounded-md px-2 py-1 border border-neutral-200 text-sm font-medium">
				{lengthOfAnswers}/{lengthOfQuestions}
			</div>
		</div>
	);
};

export default PlayQuizzHeader;
