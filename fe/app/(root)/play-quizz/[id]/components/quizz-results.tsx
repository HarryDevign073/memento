import CheckCircle from "@/components/icons/check-circle";

import { IQuizzResult } from ".";

interface QuizzResultsProps {
	quizzResult?: IQuizzResult;
}

const QuizzResults: React.FC<QuizzResultsProps> = ({ quizzResult }) => {
	if (!quizzResult) return null;

	return (
		<div className="flex flex-col items-center gap-3">
			<CheckCircle />

			<div className="mx-auto text-2xl font-semibold text-neutral-600">Quiz completed</div>

			<div className="mx-auto w-28 bg-violet-500 rounded-lg p-1">
				<span className="text-white text-sm font-medium font-semibold flex justify-center">Your score</span>
				<div className="py-3 w-full rounded-md bg-white text-base font-semibold text-neutral-700 text-center">
					{quizzResult.correct}/{quizzResult.total}
				</div>
			</div>
		</div>
	);
};

export default QuizzResults;
