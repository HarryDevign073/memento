import QuizPlayHistory from "../models/db/quiz_play_histories";

const getQuizPlayHistory = async (id) => {
	return await QuizPlayHistory.findByPk(id);
};

const createQuizPlayHistory = async (quizPlayHistoryData) => {
	return await QuizPlayHistory.create(quizPlayHistoryData);
};

const deleteQuizPlayHistory = async (id) => {
	return await QuizPlayHistory.destroy({ where: { id } });
};

export { getQuizPlayHistory, createQuizPlayHistory, deleteQuizPlayHistory };
