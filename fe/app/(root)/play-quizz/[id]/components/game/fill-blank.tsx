import { Textarea } from "@/components/ui/textarea";

interface FillBlankQuestionItemProps {
	selected: string | null;
	onSelect: (val: string) => void;

	finalAnswer?: string; /// This is the answer of question: true or false
	isCorrect?: boolean; /// This is the var to check if the answer is correct or not
}

const MAX_ANSWER_INPUT_LENGTH = 1000;

const FillBlankQuestionItem: React.FC<FillBlankQuestionItemProps> = ({ selected, onSelect, finalAnswer }) => {
	return (
		<div className="flex flex-col gap-4">
			<Textarea
				className="resize-none h-60"
				placeholder="Write your answer here..."
				maxLength={MAX_ANSWER_INPUT_LENGTH}
				value={selected || ""}
				onChange={(e) => onSelect(e.target.value)}
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
