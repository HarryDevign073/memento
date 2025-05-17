"use server";

import { getQuizzDetailsById } from "@/actions/quizz";
import PlaySection from "@/app/(root)/play-quizz/[id]/components";
import { Question, QuizzDetails } from "@/types/quizz";
import { handleHttpResponse } from "@/utils/http";

type Props = {
	params: {
		id: string;
	};
};

const PlayQuizz: React.FC<Props> = async ({ params }) => {
	const { id } = await params;

	let questions: Question[] = [];

	if (id) {
		const res = await getQuizzDetailsById(id);

		handleHttpResponse({
			response: res,
			callback: () => {
				const details = res as QuizzDetails[];

				if (details.length > 0) {
					questions = [...details[0].quiz_questions];
				}
			},
		});
	}

	return <PlaySection questions={questions} quizzId={Number(id)} />;
};

export default PlayQuizz;
