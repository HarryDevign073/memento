import { useMemo, useState } from "react";
import { Book, Play, RefreshCcw, Sparkles } from "lucide-react";

import { useToast } from "@/context/toast-context";

import { FillInTheBlankQuestion, MultipleChoiceQuestion, Question, Quizz, TrueFalseQuestion } from "@/types/quizz";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CheckCircle from "@/components/icons/check-circle";

import TrueFalseQuestionItem from "./true-false";
import CheckAnswerBadge from "./check-answer-badge";
import MultipleChoiceQuestionItem from "./multiple-choice";
import FillBlankQuestionItem from "./fill-blank";

import { cn } from "@/lib/utils";

interface QuizzPlayTriggerProps {
	quizz?: Quizz;
	disabled?: boolean;
}

interface IQuizzResult {
	correct: number;
	incorrect: number;
	total: number;
}

const QuizzPlayTrigger: React.FC<QuizzPlayTriggerProps> = ({ disabled, quizz }) => {
	const { setToast } = useToast();

	const [open, setOpen] = useState<boolean>(false);
	const [selectedChoice, setSelectedChoice] = useState<Record<string, string>>({});
	const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
	const [answeredQuestions, setAnsweredQuestions] = useState<
		Record<string, { isCorrect: boolean; correctAnswer: any }>
	>({});
	const [showResult, setShowResult] = useState<boolean>(false);
	const [quizzResult, setQuizzResult] = useState<IQuizzResult | undefined>(undefined);

	const lengthOfAnswers = useMemo(() => Object.keys(answeredQuestions).length, [answeredQuestions]);

	const percentage = useMemo(() => {
		if (!quizz) return 0;

		const totalQuestions = (quizz?.question || []).length;

		return (lengthOfAnswers / totalQuestions) * 100;
	}, [quizz, answeredQuestions]);

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

		const question = quizz?.question[activeQuestionIndex];

		if (!question) return;

		let isCorrect: boolean = false;
		let correctAnswer: any;

		switch (question.type) {
			case "true_false":
				const parsedAnswer = answer == "true" ? true : false;
				correctAnswer = (quizz?.question[activeQuestionIndex] as TrueFalseQuestion).answer;
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

	const onNavigateToNextQuestion = () => {
		if (activeQuestionIndex < (quizz?.question || []).length - 1) {
			setActiveQuestionIndex(activeQuestionIndex + 1);
			setShowResult(false);
		} else {
			setQuizzResult({
				correct: Object.values(answeredQuestions).filter((answer) => answer.isCorrect).length,
				incorrect: Object.values(answeredQuestions).filter((answer) => !answer.isCorrect).length,
				total: (quizz?.question || []).length,
			});
		}
	};

	const renderFooter = (): React.ReactNode => {
		if (!showResult) {
			return (
				<Button
					className="disabled:hover:cursor-not-allowed"
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
			<div className="flex items-center justify-between flex-1">
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
		<>
			<Dialog
				open={open}
				onOpenChange={(val) => {
					setOpen(val);
					resetAnswer();
				}}
			>
				<DialogTrigger asChild>
					<Button disabled={disabled} size={"lg"}>
						<Play /> <div className="hidden md:block">Play</div>
					</Button>
				</DialogTrigger>
				<DialogContent
					className="sm:max-w-[60%]"
					// Prevent the dialog from closing when clicking outside
					onInteractOutside={(e) => {
						e.preventDefault();
					}}
				>
					<DialogHeader>
						<DialogTitle>
							<div className="flex items-center gap-3">
								<Book size={32} className="text-violet-500" />
								<div className="bg-neutral-100 rounded-full w-9/12 h-2 relative">
									<div
										className="absolute top-0 left-0 h-full rounded-full bg-violet-500"
										style={{ width: `${percentage}%` }}
									></div>
								</div>
								<div className="rounded-md px-2 py-1 border border-neutral-200 text-sm font-medium">
									{lengthOfAnswers}/{quizz?.question?.length || 0}
								</div>
							</div>
						</DialogTitle>
					</DialogHeader>
					<div className="max-h-[60dvh] pt-6 overlow-y-auto">
						{(quizz?.question || [])
							.filter((_, index) => index === activeQuestionIndex)
							.map((question, index) => (
								<div key={`question-${index}`} className="h-full w-full flex flex-col gap-4">
									<div className="text-xl font-semibold text-neutral-700">{question.question}</div>
									{renderQuestions(question)}
								</div>
							))}
					</div>
					<DialogFooter
						className={cn(
							"-mx-6 -mb-6 rounded-b-lg p-4",
							showResult
								? answeredQuestions[`question-${activeQuestionIndex}`]?.isCorrect
									? "bg-green-50"
									: "bg-red-50"
								: ""
						)}
					>
						{renderFooter()}
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{quizzResult && (
				<Dialog
					open={!!quizzResult}
					onOpenChange={(val) => {
						if (!val) {
							setQuizzResult(undefined);
						}
					}}
				>
					<DialogContent
						className="sm:max-w-[40%]"
						onInteractOutside={(e) => {
							e.preventDefault();
						}}
					>
						<div className="flex flex-col items-center gap-6">
							<CheckCircle />

							<div className="mx-auto text-4xl font-semibold text-neutral-600">Quiz completed</div>

							<div className="mx-auto w-28 bg-violet-500 rounded-lg p-1">
								<span className="text-white text-sm font-medium font-semibold flex justify-center">Your score</span>
								<div className="py-3 w-full rounded-md bg-white text-base font-semibold text-neutral-700 text-center">
									{quizzResult.correct}/{quizzResult.total}
								</div>
							</div>

							<div className="w-full flex px-4 gap-4 mt-2">
								<Button
									variant={"outline"}
									size={"lg"}
									className="text-sm font-medium text-neutral-700 flex-1"
									onClick={() => {
										resetAnswer();
										setQuizzResult(undefined);
									}}
								>
									<RefreshCcw size={20} />
									Restart
								</Button>

								<Button size={"lg"} className="text-sm font-medium text-white flex-1" onClick={() => {}}>
									<Sparkles size={20} />
									Generate new quiz
								</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
};

export default QuizzPlayTrigger;
