"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Edit, Play, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import NoQuestionImage from "../../../../public/illustration/no-question.svg";
import CreateQuestionDialog from "@/components/feature/Dialog/CreateQuestionDialog";

function QuizDetail({ id }: { id: number }) {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<>
			<h1 className="head-text">Your collections detail</h1>
			<p className="sub-text">Separate your questions into suitable categories</p>

			<section className="mt-9 h-full flex flex-col gap-10">
				<div className="flex justify-between items-center w-full">
					<Link href="/quizzes">
						<Button variant="outline" size="lg">
							<ArrowLeft />
							<div className="hidden md:block">Back</div>
						</Button>
					</Link>

					<div className="flex items-center gap-2">
						<Button disabled variant={"outline"} size={"lg"}>
							<Edit />
							<div className="hidden md:block">Edit</div>
						</Button>
						<Button disabled size={"lg"}>
							<Play /> <div className="hidden md:block">Play</div>
						</Button>
					</div>
				</div>

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
							{id && <CreateQuestionDialog id={Number(id)} onClose={() => setOpen(false)} />}
						</DialogContent>
					</Dialog>
				</div>
			</section>
		</>
	);
}

export default QuizDetail;