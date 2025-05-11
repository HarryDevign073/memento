"use server";

import { getQuizzDetailsById } from "@/actions/quizz";

import QuizDetailContainer from "./components";
import { Quizz } from "@/types/quizz";

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
		if (quizzDetails.length > 0) {
			quizz = {
				id: quizzDetails[0].quiz_id.toString(),
				question: quizzDetails[0].quiz_questions,
			};
		}
	}

	return <QuizDetailContainer id={Number(id)} quizz={quizz} />;
};

export default QuizDetail;