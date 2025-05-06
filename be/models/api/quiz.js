export const formatQuizResponse = (quiz) => {
	return {
		id: quiz.id,
		title: quiz.title,
		difficulty: quiz.difficulty,
		createdAt: quiz.createdAt,
	};
};
