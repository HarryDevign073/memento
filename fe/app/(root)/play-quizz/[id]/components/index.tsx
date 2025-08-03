"use client";

import React from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { addPlayQuizzHistory } from "@/actions/quizz";

import { FillInTheBlankQuestion, MultipleChoiceQuestion, Question, TrueFalseQuestion } from "@/types/quizz";

import { Button } from "@/components/ui/button";

import FillBlankQuestionItem from "./game/fill-blank";
import CheckAnswerBadge from "./check-answer-badge";
import TrueFalseQuestionItem from "./game/true-false";
import MultipleChoiceQuestionItem from "./game/multiple-choice";
import PlayQuizzHeader from "./header";
import QuizzResults from "./quizz-results";
import QuizzAction from "./quizz-action";

import { handleHttpResponse } from "@/utils/http";
import { refetchQuizz } from "@/utils/quizz";
import { cn } from "@/lib/utils";

interface PlaySectionProps {
	questions: Question[];
	quizzId: number;
}

export interface IQuizzResult {
	correct: number;
	incorrect: number;
	total: number;
}

interface IAnsweredQuestion {
	isCorrect: boolean;
	correctAnswer: any;
	userAnswer: any;
}

const PlaySection: React.FC<PlaySectionProps> = ({ questions, quizzId }) => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const [selectedChoice, setSelectedChoice] = useState<Record<string, string>>({});
	const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
	const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, IAnsweredQuestion>>({});
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
				isCorrect = correctAnswer == parsedAnswer;
				break;
			case "multiple_choice":
				correctAnswer = (question as MultipleChoiceQuestion).choice.find((choice) => choice.correct)?.answer;
				isCorrect = correctAnswer == answer;
				break;
			case "fill_in_the_blank":
				correctAnswer = (question as FillInTheBlankQuestion).answer;
				isCorrect = correctAnswer == answer;
				break;
			default:
				break;
		}

		setAnsweredQuestions({
			...answeredQuestions,
			[`question-${activeQuestionIndex}`]: { isCorrect, correctAnswer, userAnswer: answer },
		});
		setShowResult(true);
	};

	const onNavigateToNextQuestion = async () => {
		if (activeQuestionIndex < (questions || []).length - 1) {
			setActiveQuestionIndex(activeQuestionIndex + 1);
			setShowResult(false);
		} else {
			const quizzResult = getQuizzResult();

			await refetchQuizz(queryClient);

			const res = await addPlayQuizzHistory({
				quizz_id: quizzId,
				score: quizzResult.correct,
			});

			handleHttpResponse({
				response: res,
				errorState: {
					message: "Failed to add play quizz history",
				},
			});
		}
	};

	const getQuizzResult = (): IQuizzResult => {
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

		return result;
	};

	const renderFooter = (): React.ReactNode => {
		if (!showResult) {
			return (
				<Button
					className="disabled:!cursor-not-allowed ml-auto"
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

	const renderQuestions = (question: Question, questionIndex?: number) => {
		let checkedQuestionIndex = activeQuestionIndex;
		if (questionIndex != undefined && quizzResult) {
			checkedQuestionIndex = questionIndex;
		}

		switch (question.type) {
			case "true_false":
				return (
					<TrueFalseQuestionItem
						finalAnswer={
							answeredQuestions[`question-${checkedQuestionIndex}`] != undefined
								? (question as unknown as TrueFalseQuestion).answer
								: undefined
						}
						isCorrect={
							answeredQuestions[`question-${checkedQuestionIndex}`] != undefined
								? answeredQuestions[`question-${checkedQuestionIndex}`]?.isCorrect
								: undefined
						}
						selected={selectedChoice[`question-${checkedQuestionIndex}`] as "true" | "false" | null}
						onSelect={(val) => {
							setSelectedChoice({
								...selectedChoice,
								[`question-${checkedQuestionIndex}`]: val,
							});
						}}
					/>
				);
			case "multiple_choice":
				return (
					<MultipleChoiceQuestionItem
						question={question as MultipleChoiceQuestion}
						selected={selectedChoice[`question-${checkedQuestionIndex}`] as string | null}
						onSelect={(val) => {
							setSelectedChoice({
								...selectedChoice,
								[`question-${checkedQuestionIndex}`]: val,
							});
						}}
						isCorrect={
							answeredQuestions[`question-${checkedQuestionIndex}`] != undefined
								? answeredQuestions[`question-${checkedQuestionIndex}`]?.isCorrect
								: undefined
						}
						finalAnswer={
							answeredQuestions[`question-${checkedQuestionIndex}`] != undefined
								? (question as unknown as MultipleChoiceQuestion).choice.find((choice) => choice.correct)?.answer
								: undefined
						}
					/>
				);
			case "fill_in_the_blank":
				return (
					<FillBlankQuestionItem
						selected={selectedChoice[`question-${checkedQuestionIndex}`]}
						onSelect={(val) => {
							setSelectedChoice({
								...selectedChoice,
								[`question-${checkedQuestionIndex}`]: val,
							});
						}}
						finalAnswer={
							answeredQuestions[`question-${checkedQuestionIndex}`] != undefined
								? (question as unknown as FillInTheBlankQuestion).answer
								: undefined
						}
						isCorrect={
							answeredQuestions[`question-${checkedQuestionIndex}`] != undefined
								? answeredQuestions[`question-${checkedQuestionIndex}`]?.isCorrect
								: undefined
						}
						disabled={showResult}
					/>
				);
			default:
				return <></>;
		}
	};

	const slicedQuestions = useMemo(() => {
		return questions.filter((_, index) => index === activeQuestionIndex);
	}, [activeQuestionIndex, questions]);

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
				<QuizzResults quizzResult={quizzResult} />

				<div className="w-full flex flex-col gap-4">
					{!quizzResult && <PlayQuizzHeader lengthOfAnswers={lengthOfAnswers} lengthOfQuestions={questions.length} />}

					<div className={cn("pt-6", !quizzResult ? "max-h-[60dvh] overlow-y-auto" : "flex flex-col gap-16")}>
						{(!quizzResult ? slicedQuestions : questions).map((question, index) => (
							<div key={`question-${index}`} className={cn("flex flex-col gap-4 w-full", quizzResult ? "" : "h-full")}>
								<div>
									{quizzResult && <div className="text-sm font-normal text-neutral-600">Question {index + 1}</div>}
									<div className={cn("font-semibold text-neutral-700", quizzResult ? "text-lg" : "text-xl")}>
										{question.question}
									</div>
								</div>
								{renderQuestions(question, quizzResult ? index : undefined)}
								{quizzResult && (
									<div className="flex gap-2">
										<span className="text-sm font-semibold text-neutral-700">Explaination:</span>
										<span className="text-sm font-normal text-neutral-500">{question.explanation || ""}</span>
									</div>
								)}
							</div>
						))}
					</div>

					{!quizzResult && (
						<>
							{showResult && questions?.[activeQuestionIndex]?.explanation && (
								<div className="flex gap-2">
									<span className="text-sm font-semibold text-neutral-700">Explaination:</span>
									<span className="text-sm font-normal text-neutral-500">
										{questions?.[activeQuestionIndex]?.explanation || ""}
									</span>
								</div>
							)}
							<div
								className={cn(
									"w-full",
									showResult
										? answeredQuestions[`question-${activeQuestionIndex}`]?.isCorrect
											? "bg-green-50"
											: "bg-red-50"
										: "",
									showResult ? "rounded-md p-3" : "flex justify-end"
								)}
							>
								{renderFooter()}
							</div>
						</>
					)}
				</div>

				{quizzResult && <QuizzAction onQuit={() => setQuizzResult(undefined)} onRestart={resetAnswer} />}
			</div>
		</div>
	);
};

export default PlaySection;