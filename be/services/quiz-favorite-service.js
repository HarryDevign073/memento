import QuizFavorite from "../models/db/quiz_favorites";

const getQuizFavorite = async (id) => {
	return await QuizFavorite.findByPk(id);
};

const createQuizFavorite = async (quizFavoriteData) => {
	return await QuizFavorite.create(quizFavoriteData);
};

const deleteQuizFavorite = async (id) => {
	return await QuizFavorite.destroy({ where: { id } });
};

export { getQuizFavorite, createQuizFavorite, deleteQuizFavorite };
