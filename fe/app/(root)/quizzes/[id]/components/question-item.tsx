import { useEffect } from "react";
import { Copy, FolderDown, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Question, QuestionType } from "@/types/quizz";

import { Button } from "@/components/ui/button";

import QuestionSetup from "./question-setup";
import QuestionView from "./question-view";

import { cn } from "@/lib/utils";

type Props = {
	isEdit: boolean;
	index: number;
	question: Question;

	disabled?: boolean;

	onChange: (question: Question) => void;
	onRemove: (index: number) => void;
};

const QuestionItem: React.FC<Props> = ({ isEdit, index, question, disabled, onChange, onRemove }) => {
	const form = useForm<Question>({
		defaultValues: question,
	});

	const { watch } = form;

	const questionType = watch("type");

	// Dispatch the onChange event when the form is changed
	useEffect(() => {
		const subscription = form.watch((value) => {
			onChange(value as Question);
		});

		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const getQuestionType = (type: QuestionType): string => {
		switch (type) {
			case "fill_in_the_blank":
				return "Fill in the blank";
			case "multiple_choice":
				return "Multiple choice";
			case "true_false":
				return "True or false";
			default:
				return "";
		}
	};

	const onCopyQuestion = () => {};

	const onAddToCollection = () => {};

	return (
		<div
			className={cn(
				"flex items-start",
				index > 0 && isEdit && "border-t border-neutral-200",
				index > 0 ? "mt-4" : "",
				isEdit ? "flex-col md:flex-row gap-3 md:gap-40" : "flex-col gap-5 border border-neutral-200 rounded-lg p-4"
			)}
		>
			<div className={cn("flex flex-col", isEdit && "py-3")}>
				<span className={cn(isEdit ? "text-sm font-semibold text-neutral-900" : "text-xs text-neutral-600")}>
					{isEdit ? `Question #${index + 1}` : `Quesion ${index + 1}`}
				</span>
				<span className={cn(isEdit ? "text-sm text-neutral-600" : "text-md font-medium text-neutral-700")}>
					{isEdit ? getQuestionType(questionType) : question.question}
				</span>
			</div>

			<div className={cn(isEdit ? "border border-neutral-200 rounded-lg w-full flex-1 p-5" : "w-full")}>
				{isEdit ? (
					<>
						<QuestionSetup form={form} index={index} />
						<button
							className="mt-4 ml-auto flex items-center gap-2 text-sm font-semibold text-red-700 hover:text-red-600 disabled:text-neutral-300 hover:text-neutral-300 disabled:hover:cursor-not-allowed cursor-pointer"
							onClick={() => onRemove(index)}
							disabled={disabled}
						>
							<Trash2 size={20} /> Remove
						</button>
					</>
				) : (
					<>
						<QuestionView question={question} />
						<div className="flex items-center justify-end gap-2 mt-4 w-full">
							<Button
								size={"sm"}
								variant={"outline"}
								className="text-sm font-medium text-neutral-700 cursor-pointer"
								onClick={onCopyQuestion}
							>
								<Copy size={20} />
								Copy
							</Button>
							<Button
								size={"sm"}
								variant={"outline"}
								className="text-sm font-medium text-neutral-700 cursor-pointer"
								onClick={onAddToCollection}
							>
								<FolderDown size={20} />
								Add to collection
							</Button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default QuestionItem;