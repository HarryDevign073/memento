"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Edit, Play, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateQuestionDialog from "@/components/feature/Dialog/CreateQuestionDialog";

import { Quizz } from "@/types/quizz";

import NoQuestionImage from "../../../../../public/illustration/no-question.svg";

import QuestionList from "./questions";

type Props = {
	id: number;
	quizz?: Quizz;
};

const QuizDetailContainer: React.FC<Props> = ({ id, quizz }) => {
	const [open, setOpen] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);

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
		form.reset({
			id: quizz?.id || "",
			question: quizz?.question || [],
		});
	};

	return (
		<>
			<h1 className="head-text">Create your questions</h1>
			<p className="sub-text">Using AI to generate your questions from input</p>

			<section className="mt-9 h-full flex flex-col gap-10">
				<div className="flex justify-between items-center w-full">
					<Link href="/quizzes">
						<Button variant="outline" size="lg">
							<ArrowLeft />
							<div className="hidden md:block">Back</div>
						</Button>
					</Link>

					<div className="flex items-center gap-2">
						{!isEdit && (
							<>
								<Button variant={"outline"} size={"lg"} onClick={() => setIsEdit(true)}>
									<Edit />
									<div className="hidden md:block">Edit</div>
								</Button>
								<Button disabled size={"lg"}>
									<Play /> <div className="hidden md:block">Play</div>
								</Button>
							</>
						)}
					</div>
				</div>

				{questions && questions.length > 0 ? (
					<QuestionList isEdit={isEdit} form={form} onCancel={onCancel} onCancelEdit={() => setIsEdit(false)} />
				) : (
					<div className="w-full h-full flex flex-col items-center justify-center gap-6">
						<Image src={NoQuestionImage} alt="No question yet" width={320} />

						<div className="flex flex-col items-center gap-1">
							<h2 className="head-text-sub text-center">No questions available yet</h2>
							<p className="sub-text text-center">Start by creating your questions and add them to this collection</p>
						</div>

						<Dialog open={open} onOpenChange={setOpen}>
							<DialogTrigger asChild>
								<Button size={"lg"}>
									<Sparkles /> Generate Quiz
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[80%]">
								<CreateQuestionDialog id={Number(id)} quizzForm={form} onClose={() => setOpen(false)} />
							</DialogContent>
						</Dialog>
					</div>
				)}
			</section>
		</>
	);
};

export default QuizDetailContainer;