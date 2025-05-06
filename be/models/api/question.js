export const formatQuestionResponse = (question) => {
	return {
		id: question.id,
		text: question.text,
		type: question.type,
		createdAt: question.createdAt,
	};
};
