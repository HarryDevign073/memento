import { useMemo } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";

import { cn } from "@/lib/utils";

interface TrueFalseQuestionProps {
	selected: "true" | "false" | null;
	onSelect: (val: "true" | "false") => void;

	finalAnswer?: boolean; /// This is the answer of question: true or false
	isCorrect?: boolean; /// This is the var to check if the answer is correct or not
}

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({ onSelect, selected, finalAnswer, isCorrect }) => {
	const options = useMemo<{ label: string; value: "true" | "false"; icon: React.ReactNode }[]>(
		() => [
			{ label: "True", value: "true", icon: <ThumbsUp size={18} /> },
			{ label: "False", value: "false", icon: <ThumbsDown size={18} /> },
		],
		[]
	);

	return (
		<div className="flex flex-col gap-4">
			{options.map((option) => (
				<div
					key={option.value}
					className={cn(
						"py-2.5 px-5 rounded-md border flex items-center gap-4",
						selected === option.value && finalAnswer === undefined
							? "border-violet-500"
							: finalAnswer === undefined
							? "border-neutral-200"
							: String(finalAnswer) === option.value
							? "border-[#079455]"
							: selected === option.value && !isCorrect
							? "border-[#D92D20]"
							: "border-neutral-200",
						isCorrect == undefined && "hover:border-violet-500 cursor-pointer"
					)}
					onClick={() => isCorrect == undefined && onSelect(option.value)}
				>
					<div
						className={cn(
							"w-9 h-9 rounded-md border flex items-center justify-center",
							selected === option.value && finalAnswer === undefined
								? "border-violet-500 bg-violet-500 text-white"
								: finalAnswer === undefined
								? "border-neutral-200 text-neutral-600"
								: String(finalAnswer) === option.value
								? "border-[#079455] bg-[#079455] text-white"
								: selected === option.value && !isCorrect
								? "border-[#D92D20] bg-[#D92D20] text-white"
								: "border-neutral-200 text-neutral-600"
						)}
					>
						{option.icon}
					</div>
					<div className="text-base text-neutral-700">{option.label}</div>
				</div>
			))}
		</div>
	);
};

export default TrueFalseQuestion;
