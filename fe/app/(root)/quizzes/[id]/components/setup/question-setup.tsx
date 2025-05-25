"use client";

import { useState } from "react";
import { FieldErrors, UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { FillInTheBlankQuestion, MultipleChoiceQuestion, Question } from "@/types/quizz";

import { cn } from "@/lib/utils";
import { ALPHABET_OPTIONS } from "../_constants";

interface QuestionSetupProps {
	index: number;
	form: UseFormReturn<Question>;
}

const MAX_QUESTION_INPUT_LENGTH = 1000;

const QuestionSetup: React.FC<QuestionSetupProps> = ({ index, form }) => {
	const [selectedCorrectAnswer, setSelectedCorrectAnswer] = useState<string>(() => {
		const choice = form.getValues("choice");
		const type = form.getValues("type");
		if (type === "multiple_choice") {
			const correctAnswer = (choice ?? []).find((choice) => choice.correct)?.answer;
			console.info("correctAnswer: ", correctAnswer);
			return correctAnswer ?? "";
		}
		return "";
	});

	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = form;

	const questionType = watch("type");
	const questionInput = watch("question");
	const answer = watch("answer");
	const choice = watch("choice");
	const explanation = watch("explanation");

	const onAddChoice = () => {
		setValue("choice", [...(choice ?? []), { answer: "", correct: false }]);
	};

	const onRemoveChoice = (index: number) => {
		const newChoice = choice.filter((_, i) => i !== index);
		setValue("choice", newChoice);
	};

	if (questionType === "multiple_choice") {
		return (
			<div className="flex flex-col gap-6">
				<div className="flex flex-col h-full gap-1.5">
					<Label htmlFor={`question-${index}`} className="text-sm font-medium text-neutral-700">
						Question
					</Label>
					<Textarea
						id={`question-${index}`}
						className={cn("resize-none h-[320px] md:h-full", errors?.question && "border-red-500")}
						placeholder="Write a question or topic here..."
						maxLength={MAX_QUESTION_INPUT_LENGTH}
						{...register("question", { required: true })}
					/>
					<p className="text-sm text-muted-foreground">
						{MAX_QUESTION_INPUT_LENGTH - questionInput.length} characters left
					</p>
				</div>

				{(choice ?? []).map((_, index) => (
					<div className="flex items-end gap-3" key={index}>
						<div className="grid gap-2 flex-1">
							<Label htmlFor={`choice-${index}`} className="text-sm font-medium text-neutral-700">
								Answer {ALPHABET_OPTIONS[index].value}
							</Label>
							<Input
								id={`choice-${index}`}
								className={cn(
									(errors as FieldErrors<MultipleChoiceQuestion>).choice && "border-red-500",
									"placeholder:not-italic placeholder:font-normal placeholder:text-sm placeholder:text-neutral-500"
								)}
								type="text"
								placeholder="Write your answer..."
								required
								maxLength={MAX_QUESTION_INPUT_LENGTH}
								{...register(`choice.${index}.answer`, { required: true })}
							/>
						</div>

						<button
							className="mb-3 cursor-pointer disabled:cursor-not-allowed disabled:text-neutral-200 text-red-700 hover:text-red-600"
							onClick={() => onRemoveChoice(index)}
							disabled={choice.length === 1 && index === 0}
						>
							<Trash2 size={20} />
						</button>
					</div>
				))}

				<button
					className="flex items-center gap-2 text-sm font-semibold text-violet-500 hover:text-violet-400 cursor-pointer"
					onClick={onAddChoice}
				>
					<Plus size={20} />
					Add options
				</button>

				<div className="grid gap-2 w-full">
					<Label htmlFor="correct-answer">Correct Answer</Label>
					<Select
						value={selectedCorrectAnswer}
						onValueChange={(val) => {
							setSelectedCorrectAnswer(val);
							choice.forEach((c, i) => {
								if (c.answer !== val) {
									setValue(`choice.${i}.correct`, false);
								} else {
									setValue(`choice.${i}.correct`, true);
								}
							});
						}}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select correct answer" />
						</SelectTrigger>
						<SelectContent>
							{(choice ?? []).length > 0 &&
								(choice ?? []).map((c, index) => (
									<SelectItem key={index} value={c.answer}>
										Answer {ALPHABET_OPTIONS[index].value}
									</SelectItem>
								))}
						</SelectContent>
					</Select>
				</div>

				<div className="flex flex-col h-full gap-1.5">
					<Label htmlFor={`answer-info-${index}`} className="text-sm font-medium text-neutral-700">
						Answer Info (optional)
					</Label>
					<Textarea
						id={`answer-info-${index}`}
						className={cn("resize-none h-[320px] md:h-full", errors?.explanation && "border-red-500")}
						placeholder="Write a brief explanation of your correct answer ..."
						maxLength={MAX_QUESTION_INPUT_LENGTH}
						{...register("explanation", { required: true })}
					/>
					<p className="text-sm text-muted-foreground">
						{MAX_QUESTION_INPUT_LENGTH - explanation.length} characters left
					</p>
				</div>
			</div>
		);
	}

	if (questionType === "true_false") {
		return (
			<div className="flex flex-col gap-6">
				<div className="flex flex-col h-full gap-1.5">
					<Label htmlFor={`question-${index}`} className="text-sm font-medium text-neutral-700">
						Question
					</Label>
					<Textarea
						id={`question-${index}`}
						className={cn("resize-none h-[320px] md:h-full", errors?.question && "border-red-500")}
						placeholder="Write a question or topic here..."
						maxLength={MAX_QUESTION_INPUT_LENGTH}
						{...register("question", { required: true })}
					/>
					<p className="text-sm text-muted-foreground">
						{MAX_QUESTION_INPUT_LENGTH - questionInput.length} characters left
					</p>
				</div>

				<div className="flex items-center justify-between">
					<Label className="text-sm font-medium text-neutral-700">Correct Answer</Label>

					<Tabs
						value={String(answer)}
						onValueChange={(value: string) => setValue("answer", value === "false" ? false : true)}
					>
						<TabsList>
							<TabsTrigger value="true">True</TabsTrigger>
							<TabsTrigger value="false">False</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				<div className="flex flex-col h-full gap-1.5">
					<Label htmlFor={`answer-info-${index}`} className="text-sm font-medium text-neutral-700">
						Answer Info (optional)
					</Label>
					<Textarea
						id={`answer-info-${index}`}
						className={cn("resize-none h-[320px] md:h-full", errors?.explanation && "border-red-500")}
						placeholder="Write a brief explanation of your correct answer ..."
						maxLength={MAX_QUESTION_INPUT_LENGTH}
						{...register("explanation", { required: true })}
					/>
					<p className="text-sm text-muted-foreground">
						{MAX_QUESTION_INPUT_LENGTH - explanation.length} characters left
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col h-full gap-1.5">
				<Label htmlFor={`question-${index}`} className="text-sm font-medium text-neutral-700">
					Question
				</Label>
				<Textarea
					id={`question-${index}`}
					className={cn("resize-none h-[320px] md:h-full", errors?.question && "border-red-500")}
					placeholder="Write a question or topic here..."
					maxLength={MAX_QUESTION_INPUT_LENGTH}
					{...register("question", { required: true })}
				/>
				<p className="text-sm text-muted-foreground">
					{MAX_QUESTION_INPUT_LENGTH - questionInput.length} characters left
				</p>
			</div>

			<div className="grid gap-2 flex-1">
				<Label htmlFor={`choice-${index}`} className="text-sm font-medium text-neutral-700">
					Correct Answer
				</Label>
				<Input
					id={`choice-${index}`}
					className={cn(
						(errors as FieldErrors<FillInTheBlankQuestion>).answer && "border-red-500",
						"placeholder:not-italic placeholder:font-normal placeholder:text-sm placeholder:text-neutral-500"
					)}
					type="text"
					placeholder="Write your answer..."
					required
					maxLength={MAX_QUESTION_INPUT_LENGTH}
					{...register(`answer`, { required: true })}
				/>
			</div>

			<div className="flex flex-col h-full gap-1.5">
				<Label htmlFor={`answer-info-${index}`} className="text-sm font-medium text-neutral-700">
					Answer Info (optional)
				</Label>
				<Textarea
					id={`answer-info-${index}`}
					className={cn("resize-none h-[320px] md:h-full", errors?.explanation && "border-red-500")}
					placeholder="Write a brief explanation of your correct answer ..."
					maxLength={MAX_QUESTION_INPUT_LENGTH}
					{...register("explanation", { required: true })}
				/>
				<p className="text-sm text-muted-foreground">
					{MAX_QUESTION_INPUT_LENGTH - explanation.length} characters left
				</p>
			</div>
		</div>
	);
};

export default QuestionSetup;
