import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FillBlankQuestionItemProps {
	selected: string | null;
	onSelect: (val: string) => void;

	finalAnswer?: string;
	isCorrect?: boolean;

	disabled?: boolean;
}

const MAX_ANSWER_INPUT_LENGTH = 1000;

const FillBlankQuestionItem: React.FC<FillBlankQuestionItemProps> = ({
	selected,
	onSelect,
	finalAnswer,
	isCorrect,
	disabled,
}) => {
	console.info("answer fill", selected);
	return (
		<div className="flex flex-col gap-4">
			<Textarea
				className={cn(
					"resize-none h-60 disabled:bg-neutral-50 disabled:cursor-not-allowed",
					selected && finalAnswer === undefined
						? ""
						: finalAnswer === undefined
						? "border-neutral-200"
						: String(finalAnswer) === selected
						? "border-[#079455]" /// correct answer
						: !isCorrect
						? "border-[#D92D20]" /// incorrect answer
						: "border-neutral-200"
				)}
				placeholder="Write your answer here..."
				maxLength={MAX_ANSWER_INPUT_LENGTH}
				value={selected || ""}
				onChange={(e) => onSelect(e.target.value)}
				disabled={disabled}
			/>

			{finalAnswer && (
				<div className="flex flex-col gap-2 pb-10">
					<span className="text-xs font-normal text-neutral-600">Correct answer:</span>
					<p className="text-xs font-medium text-neutral-700">{finalAnswer}</p>
				</div>
			)}
		</div>
	);
};

export default FillBlankQuestionItem;
