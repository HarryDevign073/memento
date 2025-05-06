import QuizLike from "../models/db/quiz_likes";

const getQuizLike = async (id) => {
	return await QuizLike.findByPk(id);
};

const createQuizLike = async (quizLikeData) => {
	return await QuizLike.create(quizLikeData);
};

const deleteQuizLike = async (id) => {
	return await QuizLike.destroy({ where: { id } });
};

export { getQuizLike, createQuizLike, deleteQuizLike };
