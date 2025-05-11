import { QueryTypes } from "sequelize";
import sequelize from "../config/database.js";

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
		},
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
	JSON_ARRAY_LENGTH(q.questions) AS quiz_question_count,
	(
		SELECT COUNT(*)
		FROM quiz_play_histories qph
		WHERE qph.quiz_id = q.id
	) AS quiz_play_count,
	(
		SELECT COUNT(*)
		FROM quiz_likes ql
		WHERE ql.quiz_id = q.id
	) AS quiz_like_count
FROM recent_views rv
			 JOIN quizzes q ON rv.quiz_id = q.id
WHERE rv.user_id = :userId AND q.visibility = :visibility
ORDER BY rv.updated_at DESC;
	`,
		{
			replacements: {
				userId,
				visibility,
			},
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
