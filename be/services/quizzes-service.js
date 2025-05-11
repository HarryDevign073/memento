import { QueryTypes } from "sequelize";
import sequelize from "../config/database.js";
import QuizLikes from "../models/db/quiz_likes.js";
import QuizPlayHistories from "../models/db/quiz_play_histories.js";
import Quizzes from "../models/db/quizzes.js";

export const getPublicQuizzes = async (userId, search, sort) => {
	const searchClause = search
		? `AND (LOWER(q.name) LIKE LOWER('%${search}%') OR LOWER(q.description) LIKE LOWER('%${search}%'))`
		: "";
	const orderBy = sort === "asc" ? "ASC" : "DESC";

	const result = await sequelize.query(
		`
			SELECT q.id                                 AS quiz_id,
						 q.name,
						 q.description,
						 q.visibility,
						 JSON_ARRAY_LENGTH(q.questions::json) AS quiz_questions_count, -- Cast questions to JSON if stored as text
						 COUNT(DISTINCT ql.id)                AS quiz_like_count,      -- Count of likes for the quiz
						 COUNT(DISTINCT qph.id)               AS quiz_play_count,      -- Count of plays for the quiz
						 u.id                                 AS user_id,              -- User ID of the quiz creator
						 u.first_name                         AS user_first_name,      -- First name of the quiz creator
						 u.last_name                          AS user_last_name,       -- Last name of the quiz creator
						 CASE
							 WHEN q.user_id = :userId THEN 'Public'
							 ELSE 'Community'
							 END                                AS status,
						 q.created_at
			FROM quizzes q
						 JOIN users u ON q.user_id = u.id -- Join with the users table to get user details
						 LEFT JOIN quiz_likes ql ON q.id = ql.quiz_id
						 LEFT JOIN quiz_play_histories qph ON q.id = qph.quiz_id
			WHERE q.visibility = 'public' ${searchClause}
			GROUP BY q.id, q.name, q.description, q.visibility, q.user_id, q.created_at, u.id, u.first_name, u.last_name
			ORDER BY q.created_at ${orderBy}; -- Order by created_at in the specified order
		`,
		{
			replacements: { userId },
			type: "SELECT",
		},
	);

	// Format the result to match the expected response structure
	return result.map((data) => ({
		...data,
		quiz_questions_count: Number(data.quiz_questions_count),
		quiz_like_count: Number(data.quiz_like_count),
		quiz_play_count: Number(data.quiz_play_count),
	}));
};

export const createQuiz = async (
	userId,
	quizName,
	quizDescription,
	quizVisibility,
) => {
	const quizData = {
		user_id: userId,
		name: quizName,
		description: quizDescription,
		visibility: quizVisibility,
		questions: [],
		created_by: userId,
		updated_by: userId,
	};

	return Quizzes.create(quizData);
};

export const deleteQuiz = async (quizId) => {
	return await Quizzes.destroy({ where: { id: quizId } });
};

export const getQuizById = async (quizId) => {
	const result = await sequelize.query(
		`
			SELECT q.id                                 AS quiz_id,
						 q.name                               AS quiz_name,
						 q.description                        AS quiz_description,
						 q.visibility                         AS quiz_visibility,
						 q.questions                          AS quiz_questions,
						 JSON_ARRAY_LENGTH(q.questions::json) AS quiz_question_count,
						 COUNT(DISTINCT qph.id)               AS quiz_play_count,
						 COUNT(DISTINCT ql_all.id)            AS quiz_like_count,
						 u.id                                 AS user_id,
						 u.first_name                         AS user_first_name,
						 u.last_name                          AS user_last_name,
						 q.created_at                         AS quiz_created_at,
						 q.updated_at                         AS quiz_updated_at
			FROM quizzes q
						 JOIN users u ON q.user_id = u.id
						 LEFT JOIN quiz_likes ql_all ON q.id = ql_all.quiz_id
						 LEFT JOIN quiz_play_histories qph ON q.id = qph.quiz_id
						 LEFT JOIN quiz_likes ql_user ON q.id = ql_user.quiz_id
			WHERE q.id = :quizId
			GROUP BY q.id, q.name, q.description, q.visibility, q.questions::text,
							 q.user_id, q.created_at,
							 u.id, u.first_name, u.last_name;
		`,
		{
			replacements: { quizId },
			type: QueryTypes.SELECT,
		},
	);

	// Format the result to match the expected response structure
	return result.map((data) => ({
		...data,
		quiz_question_count: Number(data.quiz_question_count),
		quiz_like_count: Number(data.quiz_like_count),
		quiz_play_count: Number(data.quiz_play_count),
	}));
};

export const updateQuiz = async (
	userId,
	quizId,
	quizName,
	quizDescription,
	quizVisibility,
) => {
	const result = await Quizzes.update(
		{
			name: quizName,
			description: quizDescription,
			visibility: quizVisibility,
			updated_by: userId,
		},
		{
			where: { id: quizId },
		},
	);

	if (result[0] === 0) {
		return null; // No rows updated, quiz not found
	}

	return getQuizById(quizId); // Return the updated quiz
};

export const getUserQuizzes = async (userId) => {
	const result = await sequelize.query(
		`
			SELECT q.id                                 AS quiz_id,
						 q.name                               AS quiz_name,
						 q.description                        AS quiz_description,
						 JSON_ARRAY_LENGTH(q.questions::json) AS quiz_questions_count,
						 COUNT(DISTINCT ql.id)                AS quiz_like_count,
						 COUNT(DISTINCT qph.id)               AS quiz_play_count,
						 u.id                                 AS quiz_owner_id,
						 u.first_name                         AS quiz_owner_first_name,
						 u.last_name                          AS quiz_owner_last_name,
						 q.created_at                         AS quiz_created_at
			FROM quizzes q
						 JOIN users u ON q.user_id = u.id
						 LEFT JOIN quiz_likes ql ON q.id = ql.quiz_id
						 LEFT JOIN quiz_play_histories qph ON q.id = qph.quiz_id
			WHERE q.user_id = :userId
			GROUP BY q.id, q.name, q.description, u.id, u.first_name, u.last_name, q.created_at;
		`,
		{
			replacements: { userId },
			type: QueryTypes.SELECT,
		},
	);

	// Format the result to match the expected response structure
	return result.map((data) => ({
		...data,
		quiz_questions_count: Number(data.quiz_questions_count),
		quiz_like_count: Number(data.quiz_like_count),
		quiz_play_count: Number(data.quiz_play_count),
	}));
};

export const getLikeQuizzes = async (userId, search, sort) => {
	const searchClause = search
		? `AND (LOWER(q.name) LIKE LOWER('%${search}%') OR LOWER(q.description) LIKE LOWER('%${search}%'))`
		: "";
	const orderBy = sort === "asc" ? "ASC" : "DESC";

	const result = await sequelize.query(
		`
			SELECT q.id                                 AS quiz_id,
						 q.name                               AS quiz_name,
						 q.description                        AS quiz_description,
						 q.visibility                         AS quiz_visibility,
						 JSON_ARRAY_LENGTH(q.questions::json) AS quiz_question_count,
						 COUNT(DISTINCT qph.id)               AS quiz_play_count,
						 COUNT(DISTINCT ql_all.id)            AS quiz_like_count,
						 u.id                                 AS user_id,
						 u.first_name                         AS user_first_name,
						 u.last_name                          AS user_last_name,
						 CASE
							 WHEN q.user_id = :userId THEN 'Public'
							 ELSE 'Community'
							 END                                AS quiz_status,
						 q.created_at                         AS quiz_created_at,
						 ql_user.created_at                   AS quiz_liked_at
			FROM quiz_likes ql_user -- The likes from the current user, to get quizzes the user has liked
						 JOIN quizzes q ON ql_user.quiz_id = q.id -- Join with quizzes table to get quiz details
						 JOIN users u ON q.user_id = u.id -- Join with the users table to get quiz creator details
						 LEFT JOIN quiz_likes ql_all
											 ON q.id = ql_all.quiz_id -- The likes from all users, to count total likes per quiz
						 LEFT JOIN quiz_play_histories qph ON q.id = qph.quiz_id -- Join with quiz_play_histories to count plays
			WHERE ql_user.user_id = :userId ${searchClause}
			GROUP BY q.id, q.name, q.description, q.visibility,
							 q.user_id, q.created_at,
							 u.id, u.first_name, u.last_name,
							 ql_user.created_at
			ORDER BY ql_user.created_at ${orderBy}; -- Order by created_at in the specified order
		`,
		{
			replacements: { userId },
			type: QueryTypes.SELECT,
		},
	);

	// Format the result to match the expected response structure
	return result.map((data) => ({
		...data,
		quiz_question_count: Number(data.quiz_question_count),
		quiz_play_count: Number(data.quiz_play_count),
		quiz_like_count: Number(data.quiz_like_count),
	}));
};

export const likeQuiz = async (userId, quizId) => {
	const quiz = await Quizzes.findByPk(quizId);
	if (!quiz) {
		return false;
	}

	const quizLike = await QuizLikes.findOne({
		where: { quiz_id: quizId, user_id: userId },
	});

	// If the quiz is already liked, return null
	if (quizLike) {
		return false;
	}

	// Create a new quiz like
	return await QuizLikes.create({
		user_id: userId,
		quiz_id: quizId,
		created_by: userId,
	});
};

export const unlikeQuiz = async (userId, quizId) => {
	const quiz = await Quizzes.findByPk(quizId);
	if (!quiz) {
		return false; // Quiz not found
	}

	const quizLike = await QuizLikes.findOne({
		where: { quiz_id: quizId, user_id: userId },
	});

	// If the quiz is not liked, return null
	if (!quizLike) {
		return false;
	}

	// Delete the quiz like
	return quizLike.destroy();
};

export const createQuizPlayHistory = async (userId, quizId, score) => {
	const quiz = await Quizzes.findByPk(quizId);
	if (!quiz) {
		return false; // Quiz not found
	}

	return await QuizPlayHistories.create({
		user_id: userId,
		quiz_id: quizId,
		score,
		created_by: userId,
	});
};

export const removeQuestionFromQuiz = async (userId, quizId, questionId) => {
	const quiz = await Quizzes.findByPk(quizId);
	if (!quiz) {
		return null; // Quiz not found
	}

	// Assuming questions is a JSON column, remove the question from the JSON array
	const updatedQuestions = quiz.questions.filter(
		(question) => question.index !== Number(questionId),
	);

	// Update the questions index
	updatedQuestions.forEach((question, index) => {
		question.index = index;
	});

	const result = await Quizzes.update(
		{ questions: updatedQuestions },
		{
			where: { id: quizId },
		},
	);

	if (result[0] === 0) {
		return null; // No rows updated
	}

	return getQuizById(quizId);
};

export const saveQuestions = async (userId, quizId, questions) => {
	const quiz = await Quizzes.findByPk(quizId);
	if (!quiz) {
		return null; // Quiz not found
	}

	const updatedQuestions = questions.map((question, index) => ({
		...question,
		index,
	}));

	const result = await Quizzes.update(
		{ questions: updatedQuestions },
		{
			where: { id: quizId },
		},
	);

	if (result[0] === 0) {
		return null; // No rows updated
	}

	return getQuizById(quizId);
};
