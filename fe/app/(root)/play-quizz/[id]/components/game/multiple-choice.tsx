import { MultipleChoiceQuestion } from "@/types/quizz";

import { ALPHABET_OPTIONS } from "@/app/(root)/quizzes/[id]/components/_constants";

import { cn } from "@/lib/utils";

interface MultipleChoiceQuestionItemProps {
	question: MultipleChoiceQuestion;

	selected: string | null;
	onSelect: (val: string) => void;

	finalAnswer?: string; /// This is the answer of question: true or false
	isCorrect?: boolean; /// This is the var to check if the answer is correct or not
}

const MultipleChoiceQuestionItem: React.FC<MultipleChoiceQuestionItemProps> = ({
	onSelect,
	selected,
	finalAnswer,
	isCorrect,
	question,
}) => {
	return (
		<div className="flex flex-col gap-4">
			{question.choice.map((choice, index) => (
				<div
					key={choice.answer}
					className={cn(
						"py-2.5 px-5 rounded-md border flex items-center gap-4",
						selected === choice.answer && finalAnswer === undefined
							? "border-violet-500"
							: finalAnswer === undefined
							? "border-neutral-200"
							: String(finalAnswer) === choice.answer
							? "border-[#079455]"
							: selected === choice.answer && !isCorrect
							? "border-[#D92D20]"
							: "border-neutral-200",
						isCorrect == undefined && "hover:border-violet-500 cursor-pointer"
					)}
					onClick={() => {
						if (isCorrect != undefined) return;
						onSelect(choice.answer);
					}}
				>
					<div
						className={cn(
							"w-9 h-9 rounded-md border flex items-center justify-center",
							selected === choice.answer && finalAnswer === undefined
								? "border-violet-500 bg-violet-500 text-white"
								: finalAnswer === undefined
								? "border-neutral-200 text-neutral-600"
								: String(finalAnswer) === choice.answer
								? "border-[#079455] bg-[#079455] text-white"
								: selected === choice.answer && !isCorrect
								? "border-[#D92D20] bg-[#D92D20] text-white"
								: "border-neutral-200 text-neutral-600"
						)}
					>
						{ALPHABET_OPTIONS[index].value}
					</div>
					<div className="text-base text-neutral-700">{question.choice[index].answer}</div>
				</div>
			))}
		</div>
	);
};

export default MultipleChoiceQuestionItem;
