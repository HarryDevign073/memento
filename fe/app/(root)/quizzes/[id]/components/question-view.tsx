import { Question } from "@/types/quizz";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
	question: Question;
};

const QuestionView: React.FC<Props> = ({ question }) => {
	if (question.type === "true_false") {
		return (
			<RadioGroup>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="true" id="true" />
					<Label htmlFor="true" className="text-sm font-normal text-neutral-600">
						True
					</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="false" id="false" />
					<Label htmlFor="false" className="text-sm font-normal text-neutral-600">
						False
					</Label>
				</div>
			</RadioGroup>
		);
	}

	if (question.type === "multiple_choice") {
		return (
			<RadioGroup>
				{(question?.choice || []).map((option) => (
					<div className="flex items-center space-x-2">
						<RadioGroupItem value={option.answer} id={option.answer} />
						<Label htmlFor={option.answer} className="text-sm font-normal text-neutral-600">
							{option.answer}
						</Label>
					</div>
				))}
			</RadioGroup>
		);
	}

	return (
		<div className="flex gap-2">
			<span className="text-xs text-neutral-600">Result:</span>
			<span className="text-xs font-medium text-neutral-700">{question.answer}</span>
		</div>
	);
};

export default QuestionView;