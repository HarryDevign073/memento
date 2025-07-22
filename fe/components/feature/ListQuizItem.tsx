"use client";

import { useRouter } from "next/navigation";
import { Download } from "lucide-react";

import { useToast } from "@/context/toast-context";

import { getQuizzDetailsById } from "@/actions/quizz";

import { HttpResponse } from "@/types/http";
import { Quizz, QuizzDetails } from "@/types/quizz";

import QuizStatus from "./QuizStatus";
import QuizOption from "./QuizOption";
import QuizInteraction from "./QuizInteraction";
import { ICardQuizz } from "./CardQuizProps";
import StatusBadge from "../custom/StatusBadge";
import HeartIcon from "../icons/heart";

import { exportCsv, getCsvDataFromQuizz } from "@/utils/csv";
import { URLS } from "@/constants/urls";

const ListQuizItem: React.FC<ICardQuizz> = ({
	quizTitle,
	quizDesc,
	questionCount,
	likeCount,
	playCount,
	authorName,
	authorNameAbbre,
	occupation,
	editable,
	quizId,
	status,
	layout = "list",
	isLiked,
	canInteract = true,
	onInteract,
}) => {
	const router = useRouter();
	const { setToast } = useToast();

	const onNavigateQuizz = () => {
		router.push(`${URLS.QUIZZES}/${quizId}`);
	};

	const onExportQuizz = async () => {
		const quizzRes = await getQuizzDetailsById(String(quizId));

		if ((quizzRes as HttpResponse)?.error) {
			return;
		}
		let quizz: Quizz & {
			name: string;
			description: string;
			user_id: number;
		} = {
			id: "",
			question: [],
			name: "",
			description: "",
			user_id: 0,
		};

		const quizzDetails = quizzRes as QuizzDetails[];

		if (quizzDetails.length > 0) {
			quizz = {
				id: quizzDetails[0].quiz_id.toString(),
				question: quizzDetails[0].quiz_questions,
				name: quizzDetails[0].quiz_name,
				description: quizzDetails[0].quiz_description,
				user_id: quizzDetails[0].user_id,
			};
		}

		if (!quizz.question.length) {
			setToast({
				type: "warning",
				title: "No questions found",
				message: "No questions found in the quiz",
			});
			return;
		}

		const exportedQuestions: object[] = getCsvDataFromQuizz(quizz.question, quizz);

		await exportCsv(exportedQuestions, quizz?.name || "quizz");
	};

	return (
		<div
			className="bg-white md:h-[120px] rounded-md border border-neutral-200 pl-3 md:pl-2 pr-3 py-3 md:py-2 flex flex-col md:flex-row gap-2 md:gap-4 relative cursor-pointer transition-transform duration-300 hover:-translate-y-[3px] hover:scale-[1.002] hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)]"
			onClick={onNavigateQuizz}
		>
			<QuizStatus status={status} layout={layout} />

			<div className="flex flex-col gap-2 px-2 md:px-0 md:gap-0 md:justify-between w-full relative">
				<div>
					<div className="w-full flex items-center justify-between gap-5">
						<div className="section-title line-clamp-1">{quizTitle}</div>

						<div className="flex items-center gap-2">
							{!editable && canInteract ? (
								<div className="flex items-center gap-2">
									<button
										className="border-0 outline-none cursor-pointer hover:opacity-80 transition-all duration-200 text-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
										onClick={(e) => {
											e.stopPropagation();
											onExportQuizz();
										}}
										disabled={questionCount === 0}
									>
										<Download size={20} />
									</button>
									<button
										className="hidden md:block border-0 outline-none cursor-pointer hover:opacity-80 transition-all duration-200"
										onClick={(e) => {
											e.stopPropagation();
											if (onInteract) {
												onInteract(isLiked ? "unlike" : "like");
											}
										}}
									>
										<HeartIcon size={20} active={isLiked} isGray={layout == "list"} />
									</button>
								</div>
							) : (
								<StatusBadge status={status} />
							)}

							<QuizOption
								editable={editable}
								quizId={quizId}
								quizz={{
									name: quizTitle,
									description: quizDesc,
									visibility: status,
								}}
								disabledExport={questionCount === 0}
								exportQuizz={onExportQuizz}
							/>
						</div>
					</div>
					<p className="text-neutral-600 text-ellipsis line-clamp-1 text-sm font-normal leading-5">{quizDesc}</p>
				</div>

				<QuizInteraction
					quizId={quizId}
					authorName={authorName}
					authorNameAbbre={authorNameAbbre}
					occupation={occupation}
					questionCount={questionCount}
					likeCount={likeCount}
					playCount={playCount}
					editable={editable}
				/>
			</div>
		</div>
	);
};

export default ListQuizItem;
