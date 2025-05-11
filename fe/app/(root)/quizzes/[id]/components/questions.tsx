import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { saveQuestion } from "@/actions/quizz";

import { Question, QuestionType, Quizz, SaveQuizzResponse } from "@/types/quizz";

import { Button } from "@/components/ui/button";

import QuestionItem from "./question-item";
import QuestionHeader from "./header";
import AddQuestionDialog from "./add-question-dialog";

import { cn } from "@/lib/utils";

type Props = {
	isEdit: boolean;
	form: UseFormReturn<Quizz>;
	onCancel: () => void;
	onCancelEdit: () => void;
};

const QuestionList: React.FC<Props> = ({ isEdit, form, onCancel, onCancelEdit }) => {
	const [questionDialogOpen, setQuestionDialogOpen] = useState<boolean>(false);
	const [questionType, setQuestionType] = useState<QuestionType>("true_false");
	const [saving, setSaving] = useState<boolean>(false);

	const { watch, setValue, handleSubmit } = form;

	const questions = watch("question");

	const onAddQuestion = () => {
		let question: Question;

		switch (questionType) {
			case "multiple_choice":
				question = {
					type: questionType,
					question: "",
					index: questions?.length ?? 0,
					choice: [{ answer: "", correct: false }],
					explanation: "",
				};
				break;
			case "true_false":
				question = {
					type: questionType,
					question: "",
					index: questions?.length ?? 0,
					answer: false,
					explanation: "",
				};
				break;
			case "fill_in_the_blank":
				question = {
					type: questionType,
					question: "",
					index: questions?.length ?? 0,
					answer: "",
					explanation: "",
				};
				break;
		}

		setValue("question", [...(questions ?? []), question]);
		setQuestionDialogOpen(false);
		setQuestionType("true_false");
	};

	const onGenerate = async (data: Quizz) => {
		try {
			setSaving(true);

			const res: SaveQuizzResponse[] = await saveQuestion(data.question, Number(data.id));

			if ((res ?? []).length > 0) {
				console.info("Questions saved successfully");
				toast.success("Questions saved successfully");
				onCancelEdit();
			}
		} catch (error) {
			console.log("error", error);
		} finally {
			setSaving(false);
		}
	};

	const isDisabled = (): boolean => {
		if (!questions?.length) return true;

		const notFilledQuestion = questions.some((question) => !question.question);

		const notFilledChoice = questions.some(
			(question) => question.type === "multiple_choice" && !question.choice?.length
		);

		const notFilledCorrectAnswer = questions.some(
			(question) => question.type === "multiple_choice" && question.choice?.every((choice) => !choice.correct)
		);

		const notFilledAnswer = questions.some((question) => {
			if (question.type === "fill_in_the_blank") return !question.answer;
			return false;
		});

		if (notFilledQuestion || notFilledCorrectAnswer || notFilledChoice || notFilledAnswer) return true;

		return false;
	};

	return (
		<form className="bg-white rounded-lg shadow" onSubmit={handleSubmit(onGenerate)}>
			<div className={cn("p-4", isEdit ? "pb-0" : "pb-4")}>
				<QuestionHeader isEdit={isEdit} questions={questions ?? []} />

				<div className="flex flex-col gap-4 pt-4">
					{(questions ?? []).map((question, index) => (
						<QuestionItem
							key={index}
							index={index}
							isEdit={isEdit}
							question={question}
							onChange={(question) => {
								setValue(`question.${index}`, question);
							}}
							onRemove={() => {
								setValue(
									`question`,
									questions?.filter((_, i) => i !== index)
								);
							}}
						/>
					))}
				</div>
			</div>

			{isEdit && (
				<>
					<div className="mt-4">
						<AddQuestionDialog
							open={questionDialogOpen}
							onClose={setQuestionDialogOpen}
							questionType={questionType}
							setQuestionType={setQuestionType}
							onAddQuestion={onAddQuestion}
						/>
					</div>

					<div className="p-4 flex justify-end gap-2">
						<Button variant={"outline"} size={"lg"} onClick={onCancel}>
							Cancel
						</Button>
						<Button
							className="w-fit text-sm font-medium cursor-pointer disabled:hover:!cursor-not-allowed flex items-center gap-2"
							type="submit"
							disabled={isDisabled() || saving}
						>
							{saving && <Loader2 className="w-4 h-4 animate-spin" />}
							Generate
						</Button>
					</div>
				</>
			)}
		</form>
	);
};

export default QuestionList;