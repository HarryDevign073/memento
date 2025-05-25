"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Edit, Play, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import { useUser } from "@/context/user-context";

import { Quizz } from "@/types/quizz";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CreateQuestionDialog from "@/components/feature/Dialog/GenerateQuestionDialog";
import EmptyList from "@/components/others/EmptyList";

import NoQuestionImage from "@/public/illustration/no-question.svg";

import QuestionList from "./setup/questions";

import { cn } from "@/lib/utils";
import { URLS } from "@/constants/urls";

interface QuizDetailContainerProps {
	id: number;
	quizz?: Quizz & {
		name: string;
		description: string;
		user_id: number;
	};
}

const QuizDetailContainer: React.FC<QuizDetailContainerProps> = ({ id, quizz }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const onlyView = searchParams.get("only_view");

	const { currentUser } = useUser();

	const [createQuestionDialogActive, setCreateQuestionDialogActive] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);

	const [initialQuizz, setInitialQuizz] = useState<Quizz | undefined>(quizz);

	const form = useForm<Quizz>({
		defaultValues: {
			id: quizz?.id || "",
			question: quizz?.question || [],
		},
	});

	const { watch } = form;

	const questions = watch("question");

	const onCancel = () => {
		setIsEdit(false);
		form.reset(initialQuizz);
	};

	const isQuizzOwner = useMemo(() => {
		return quizz?.user_id === currentUser?.user?.user_id;
	}, [currentUser, quizz]);

	return (
		<>
			<h1 className="head-text">{quizz?.name || "Create your questions"}</h1>
			<p className="sub-text">{quizz?.description || "Using AI to generate your questions from input"}</p>

			<section className="mt-9 h-full flex flex-col gap-10">
				<div className="flex justify-between items-center w-full">
					<Button variant="outline" size="lg" onClick={() => router.back()}>
						<ArrowLeft />
						<div className="hidden md:block">Back</div>
					</Button>

					<div className="flex items-center gap-2">
						{!isEdit && (
							<>
								{
									// (quizz?.question || []).length > 0 &&
									!onlyView && (
										// && isQuizzOwner
										<Button className="cursor-pointer" variant={"outline"} size={"lg"} onClick={() => setIsEdit(true)}>
											<Edit />
											<div className="hidden md:block">Edit</div>
										</Button>
									)
								}
								<Link
									href={`${URLS.PLAY_QUIZZES}/${id}`}
									className={cn(
										"bg-primary text-primary-foreground shadow-xs rounded-md px-4 py-2 flex items-center gap-2",
										!questions?.length ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-primary/90"
									)}
									onClick={(e) => {
										if (questions?.length) return;
										e.preventDefault();
									}}
								>
									<Play size={18} /> <div className="hidden md:block">Play</div>
								</Link>
							</>
						)}
					</div>
				</div>

				{questions && (questions || []).length > 0 ? (
					<QuestionList
						quizzId={id}
						isEdit={isEdit}
						form={form}
						onCancel={onCancel}
						onCancelEdit={() => setIsEdit(false)}
					/>
				) : (
					<EmptyList
						icon={<Image src={NoQuestionImage} alt="No question yet" width={320} />}
						title="No questions available yet"
						description="Start by creating your questions and add them to this collection"
						actions={
							<Button size={"lg"} onClick={() => setCreateQuestionDialogActive(true)}>
								<Sparkles /> Generate Quiz
							</Button>
						}
					/>
				)}
			</section>

			<Dialog open={createQuestionDialogActive} onOpenChange={setCreateQuestionDialogActive}>
				<DialogContent
					className="sm:max-w-[80%]"
					onInteractOutside={(e) => {
						e.preventDefault();
					}}
					onEscapeKeyDown={(e) => {
						e.preventDefault();
					}}
				>
					<CreateQuestionDialog
						id={Number(id)}
						quizzForm={form}
						onClose={() => setCreateQuestionDialogActive(false)}
						setInitialQuizz={setInitialQuizz}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default QuizDetailContainer;
