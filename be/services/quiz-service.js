import Quizzes from "../models/db/quizzes";

const getQuiz = async (id) => {
	return await Quizzes.findByPk(id);
};

const createQuiz = async (quizData) => {
	return await Quizzes.create(quizData);
};

const updateQuiz = async (id, quizData) => {
	return await Quizzes.update(quizData, { where: { id } });
};

const deleteQuiz = async (id) => {
	return await Quizzes.destroy({ where: { id } });
};

export { getQuiz, createQuiz, updateQuiz, deleteQuiz };
