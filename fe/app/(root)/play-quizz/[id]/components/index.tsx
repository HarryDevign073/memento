"use client";

import React from "react";
import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { FillInTheBlankQuestion, MultipleChoiceQuestion, Question, TrueFalseQuestion } from "@/types/quizz";

import { Button } from "@/components/ui/button";

import FillBlankQuestionItem from "./game/fill-blank";
import CheckAnswerBadge from "./check-answer-badge";
import TrueFalseQuestionItem from "./game/true-false";
import MultipleChoiceQuestionItem from "./game/multiple-choice";

import { cn } from "@/lib/utils";
import PlayQuizzHeader from "./header";
import ResultDialog from "./result-dialog";
import { useRouter } from "next/navigation";
import { addPlayQuizzHistory } from "@/actions/quizz";
import { handleHttpResponse } from "@/utils/http";

interface PlaySectionProps {
	questions: Question[];
	quizzId: number;
}

export interface IQuizzResult {
	correct: number;
	incorrect: number;
	total: number;
}

const PlaySection: React.FC<PlaySectionProps> = ({ questions, quizzId }) => {
	const router = useRouter();

	const [selectedChoice, setSelectedChoice] = useState<Record<string, string>>({});
	const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
	const [answeredQuestions, setAnsweredQuestions] = useState<
		Record<string, { isCorrect: boolean; correctAnswer: any }>
	>({});
	const [showResult, setShowResult] = useState<boolean>(false);
	const [quizzResult, setQuizzResult] = useState<IQuizzResult | undefined>(undefined);

	const lengthOfAnswers = useMemo(() => Object.keys(answeredQuestions).length, [answeredQuestions]);

	const resetAnswer = () => {
		setSelectedChoice({});
		setAnsweredQuestions({});
		setActiveQuestionIndex(0);
		setShowResult(false);
		setQuizzResult(undefined);
	};

	const onSubmitAnswer = () => {
		const answer = selectedChoice[`question-${activeQuestionIndex}`];

		if (!answer) return;

		const question = questions[activeQuestionIndex];

		if (!question) return;

		let isCorrect: boolean = false;
		let correctAnswer: any;

		switch (question.type) {
			case "true_false":
				const parsedAnswer = answer == "true" ? true : false;
				correctAnswer = (questions[activeQuestionIndex] as TrueFalseQuestion).answer;
				isCorrect = correctAnswer === parsedAnswer;
				break;
			case "multiple_choice":
				correctAnswer = (question as MultipleChoiceQuestion).choice.find((choice) => choice.correct)?.answer;
				isCorrect = correctAnswer === answer;
				break;
			case "fill_in_the_blank":
				correctAnswer = (question as FillInTheBlankQuestion).answer;
				isCorrect = correctAnswer === answer;
				break;
			default:
				break;
		}

		setAnsweredQuestions({
			...answeredQuestions,
			[`question-${activeQuestionIndex}`]: { isCorrect, correctAnswer },
		});
		setShowResult(true);
	};

	const onNavigateToNextQuestion = async () => {
		if (activeQuestionIndex < (questions || []).length - 1) {
			setActiveQuestionIndex(activeQuestionIndex + 1);
			setShowResult(false);
		} else {
			const result: IQuizzResult = Object.values(answeredQuestions).reduce(
				(acc, answer) => {
					if (answer.isCorrect) {
						acc.correct++;
					} else {
						acc.incorrect++;
					}

					return acc;
				},
				{ correct: 0, incorrect: 0, total: (questions || []).length }
			);
			setQuizzResult(result);

			const res = await addPlayQuizzHistory({
				quizz_id: quizzId,
				score: result.correct,
			});

			handleHttpResponse({
				response: res,
				errorState: {
					message: "Failed to add play quizz history",
				},
			});
		}
	};

	const renderFooter = (): React.ReactNode => {
		if (!showResult) {
			return (
				<Button
					className="disabled:hover:cursor-not-allowed ml-auto"
					size={"lg"}
					onClick={onSubmitAnswer}
					disabled={
						!selectedChoice[`question-${activeQuestionIndex}`] ||
						answeredQuestions[`question-${activeQuestionIndex}`] != undefined
					}
				>
					Submit
				</Button>
			);
		}

		return (
			<div className="w-full flex items-center justify-between flex-1">
				<CheckAnswerBadge {...answeredQuestions[`question-${activeQuestionIndex}`]} />

				<Button
					className={cn(
						"text-white",
						answeredQuestions[`question-${activeQuestionIndex}`] == undefined
							? ""
							: answeredQuestions[`question-${activeQuestionIndex}`]?.isCorrect
							? "bg-[#079455] hover:bg-[#079455]/80"
							: "bg-[#D92D20] hover:bg-[#D92D20]/80"
					)}
					size={"lg"}
					onClick={onNavigateToNextQuestion}
				>
					Continue
				</Button>
			</div>
		);
	};

	const renderQuestions = (question: Question) => {
		switch (question.type) {
			case "true_false":
				return (
					<TrueFalseQuestionItem
						finalAnswer={
							answeredQuestions[`question-${activeQuestionIndex}`] != undefined
								? (question as unknown as TrueFalseQuestion).answer
								: undefined
						}
						isCorrect={
							answeredQuestions[`question-${activeQuestionIndex}`] != undefined
								? answeredQuestions[`question-${activeQuestionIndex}`]?.isCorrect
								: undefined
						}
						selected={selectedChoice[`question-${activeQuestionIndex}`] as "true" | "false" | null}
						onSelect={(val) => {
							setSelectedChoice({
								...selectedChoice,
								[`question-${activeQuestionIndex}`]: val,
							});
						}}
					/>
				);
			case "multiple_choice":
				return (
					<MultipleChoiceQuestionItem
						question={question as MultipleChoiceQuestion}
						selected={selectedChoice[`question-${activeQuestionIndex}`] as string | null}
						onSelect={(val) => {
							setSelectedChoice({
								...selectedChoice,
								[`question-${activeQuestionIndex}`]: val,
							});
						}}
						finalAnswer={
							answeredQuestions[`question-${activeQuestionIndex}`] != undefined
								? (question as unknown as MultipleChoiceQuestion).choice.find((choice) => choice.correct)?.answer
								: undefined
						}
					/>
				);
			case "fill_in_the_blank":
				return (
					<FillBlankQuestionItem
						selected={selectedChoice[`question-${activeQuestionIndex}`] as string | null}
						onSelect={(val) => {
							setSelectedChoice({
								...selectedChoice,
								[`question-${activeQuestionIndex}`]: val,
							});
						}}
						finalAnswer={
							answeredQuestions[`question-${activeQuestionIndex}`] != undefined
								? (question as unknown as FillInTheBlankQuestion).answer
								: undefined
						}
					/>
				);
			default:
				return <></>;
		}
	};

	return (
		<div className="flex flex-col gap-6 h-full w-full">
			<div className="flex flex-col gap-6">
				<div className="flex flex-col">
					<span className="head-text">Play Quizz - Questions</span>
					<span className="sub-text">Description</span>
				</div>
				<Button variant={"outline"} size={"lg"} className="w-fit" onClick={() => router.back()}>
					<ArrowLeft size={20} />
					Back
				</Button>
			</div>

			<div className="flex flex-col gap-10 p-6 bg-white rounded-lg shadow-sm">
				<div className="w-full flex flex-col gap-4">
					<PlayQuizzHeader lengthOfAnswers={lengthOfAnswers} lengthOfQuestions={questions.length} />

					<div className="max-h-[60dvh] pt-6 overlow-y-auto">
						{questions
							.filter((_, index) => index === activeQuestionIndex)
							.map((question, index) => (
								<div key={`question-${index}`} className="h-full w-full flex flex-col gap-4">
									<div className="text-xl font-semibold text-neutral-700">{question.question}</div>
									{renderQuestions(question)}
								</div>
							))}
					</div>

					<div
						className={cn(
							"w-full",
							showResult
								? answeredQuestions[`question-${activeQuestionIndex}`]?.isCorrect
									? "bg-green-50"
									: "bg-red-50"
								: "",
							showResult ? "" : "flex justify-end"
						)}
					>
						{renderFooter()}
					</div>

					<ResultDialog
						open={!!quizzResult}
						onClose={() => setQuizzResult(undefined)}
						quizzResult={quizzResult}
						onRestartGame={() => {
							resetAnswer();
							setQuizzResult(undefined);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default PlaySection;
