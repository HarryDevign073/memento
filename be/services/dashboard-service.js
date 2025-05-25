import { QueryTypes } from "sequelize";
import sequelize from "../config/database.js";
import QuizLikes from "../models/db/quiz_likes.js";
import RecentViews from "../models/db/recent_views.js";

export const getQuizStatistics = async (userId) => {
	const result = await sequelize.query(
		`
SELECT
	COUNT(DISTINCT q.id) AS user_quiz_count,
	SUM(JSON_ARRAY_LENGTH(q.questions)) AS user_question_count,
	COUNT(DISTINCT qph.id) AS user_play_count,
	COUNT(DISTINCT ql.id) AS user_like_count
FROM quizzes q
			 LEFT JOIN quiz_play_histories qph ON q.id = qph.quiz_id
			 LEFT JOIN quiz_likes ql ON q.id = ql.quiz_id
WHERE q.user_id = :userId;
	`,
		{
			replacements: { userId },
			type: QueryTypes.SELECT,
			plain: true, // Get a single result
		}
	);

	// Format the result to match the expected response structure
	return {
		user_quiz_count: Number(result.user_quiz_count),
		user_question_count: Number(result.user_question_count),
		user_play_count: Number(result.user_play_count),
		user_like_count: Number(result.user_like_count),
	};
};

export const getRecentlyViewedQuizzes = async (userId, visibility) => {
	const result = await sequelize.query(
		`
			SELECT
				rv.quiz_id,
				q.name AS quiz_name,
				q.description AS quiz_description,
				q.visibility AS quiz_visibility,
				JSON_ARRAY_LENGTH(q.questions) AS quiz_questions_count,
				(
					SELECT COUNT(*)
					FROM quiz_play_histories qph
					WHERE qph.quiz_id = q.id
				) AS quiz_play_count,
				(
					SELECT COUNT(*)
					FROM quiz_likes ql
					WHERE ql.quiz_id = q.id
				) AS quiz_like_count,
				u.first_name AS user_first_name,
				u.last_name AS user_last_name,
				u.occupation AS user_occupation,
				rv.updated_at AS created_at,
				rv.user_id AS user_id
			FROM recent_views rv
						JOIN quizzes q ON rv.quiz_id = q.id
						JOIN users u ON q.user_id = u.id
			WHERE q.visibility = :visibility
			ORDER BY rv.updated_at DESC
	`,
		{
			replacements: {
				// rv.user_id = :userId AND
				userId,
				visibility,
			},
			type: QueryTypes.SELECT,
		}
	);

	const uniqueUserIds = [...new Set(result.map((item) => item.user_id))];

	const userQuizzeLikes = (
		await Promise.all(
			uniqueUserIds.map(async (userId) => {
				const quizzLikes = (
					await QuizLikes.findAll({
						where: {
							user_id: userId,
						},
					})
				).map((quiz) => quiz.dataValues.quiz_id);
				return quizzLikes;
			})
		)
	).filter((quiz) => quiz.length > 0);

	const uniqueQuizRecents = [...new Set(result.map((item) => item.quiz_id))].slice(0, 10);

	const recentViews = uniqueQuizRecents.map((quizId) => {
		const quiz = result.find((item) => item.quiz_id === quizId);
		return quiz;
	});

	// Format the result to match the expected response structure
	return recentViews.map((data) => ({
		...data,
		quiz_question_count: Number(data.quiz_question_count),
		quiz_play_count: Number(data.quiz_play_count),
		quiz_like_count: Number(data.quiz_like_count),
		user_liked: userQuizzeLikes.some((like) => like.quiz_id === data.quiz_id),
	}));
};
