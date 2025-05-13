"use server";

import { getQuizzDetailsById } from "@/actions/quizz";

import { Quizz, QuizzDetails } from "@/types/quizz";

import QuizDetailContainer from "./components";

import { handleHttpResponse } from "@/utils/http";

type Props = {
	params: {
		id: string;
	};
};

const QuizDetail: React.FC<Props> = async ({ params }) => {
	const { id } = await params;
	let quizz: Quizz | undefined = undefined;

	if (id) {
		const quizzDetails = await getQuizzDetailsById(id);

		handleHttpResponse({
			response: quizzDetails,
			callback: () => {
				const details = quizzDetails as QuizzDetails[];

				if (details.length > 0) {
					quizz = {
						id: details[0].quiz_id.toString(),
						question: details[0].quiz_questions,
					};
				}
			},
		});
	}

	return <QuizDetailContainer id={Number(id)} quizz={quizz} />;
};

export default QuizDetail;