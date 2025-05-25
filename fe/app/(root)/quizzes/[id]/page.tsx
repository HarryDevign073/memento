"use server";

import { addRecentView, getQuizzDetailsById } from "@/actions/quizz";

import { Quizz, QuizzDetails } from "@/types/quizz";

import QuizDetailContainer from "./components";

import { handleHttpResponse } from "@/utils/http";

type Props = {
	params: {
		id: string;
	};
};

interface IQuizDetail extends Quizz {
	name: string;
	description: string;
	user_id: number;
}

const QuizDetail: React.FC<Props> = async ({ params }) => {
	const { id } = await params;
	let quizz: IQuizDetail | undefined = undefined;

	if (id) {
		const res = await getQuizzDetailsById(id);

		handleHttpResponse({
			response: res,
			callback: () => {
				const details = res as QuizzDetails[];

				if (details.length > 0) {
					quizz = {
						id: details[0].quiz_id.toString(),
						question: details[0].quiz_questions,
						name: details[0].quiz_name,
						description: details[0].quiz_description,
						user_id: details[0].user_id,
					};
				}
			},
		});

		const addedRecent = await addRecentView(Number(id));
		console.info("addedRecent", addedRecent);
	}

	return <QuizDetailContainer id={Number(id)} quizz={quizz} />;
};

export default QuizDetail;
