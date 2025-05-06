import { QueryTypes } from "sequelize";
import sequelize from "../config/database.js";

// Home: Get total questions, total quizzes, total plays, and total likes by a specific user
const getQuizStatistics = async (userId) => {
	const result = await sequelize.query(
		`
SELECT
    COUNT(DISTINCT q.id) AS total_quizzes,
    SUM(JSON_ARRAY_LENGTH(q.questions)) AS total_questions,
    COUNT(DISTINCT qph.id) AS total_plays,
    COUNT(DISTINCT ql.id) AS total_likes
FROM quizzes q
LEFT JOIN quiz_play_histories qph ON q.id = qph.quiz_id
LEFT JOIN quiz_likes ql ON q.id = ql.quiz_id
WHERE q.user_id = ?;
	`,
		{
			replacements: [userId],
			type: QueryTypes.SELECT,
		},
	);
	return result[0];
};

// Home - Recently viewed: Get all recently viewed quizzes by a specific user
const getRecentlyViewedQuizzes = async (userId, visibility) => {
	const result = await sequelize.query(
		`
SELECT
    q.id,
    q.name,
    q.description,
    q.visibility,
    JSON_ARRAY_LENGTH(q.questions) AS total_questions,
    COUNT(ql.id) AS total_likes,
    COUNT(qph.id) AS total_play_history
FROM recent_views rv
JOIN quizzes q ON rv.quiz_id = q.id
LEFT JOIN quiz_likes ql ON q.id = ql.quiz_id
LEFT JOIN quiz_play_histories qph ON q.id = qph.quiz_id
WHERE rv.user_id = ? AND q.visibility = ?
GROUP BY q.id, rv.updated_at
ORDER BY rv.updated_at DESC;
	`,
		{
			replacements: [userId, visibility],
			type: QueryTypes.SELECT,
		},
	);
	return result;
};

// Home - Leaderboard: Show users and order by total likes
const getLeaderboard = async () => {
	const result = await sequelize.query(
		`
SELECT
    u.id AS user_id,
    u.username,
    u.display_name,
    COUNT(ql.id) AS total_likes
FROM users u
LEFT JOIN quizzes q ON u.id = q.user_id
LEFT JOIN quiz_likes ql ON q.id = ql.quiz_id
GROUP BY u.id, u.username, u.display_name
ORDER BY total_likes DESC;
	`,
		{
			type: QueryTypes.SELECT,
		},
	);
	return result;
};

// Community: Get all public quizzes, ordered by recent creation, with user details, total questions, like count, play count, and status
const getPublicQuizzes = async (userId) => {
	const result = await sequelize.query(
		`
SELECT
	q.id AS quiz_id,
	q.name,
	q.description,
	q.visibility,
	JSON_ARRAY_LENGTH(q.questions::json) AS total_questions, -- Cast questions to JSON if stored as text
	COUNT(DISTINCT ql.id) AS like_count, -- Count of likes for the quiz
	COUNT(DISTINCT qph.id) AS play_count, -- Count of plays for the quiz
	u.id AS user_id, -- User ID of the quiz creator
	u.display_name AS user_display_name, -- Display name of the quiz creator
	CASE
		WHEN q.user_id = ? THEN 'Public' -- Replace 1 with the specific user ID
		ELSE 'Community'
		END AS status,
	q.created_at
FROM quizzes q
		 JOIN users u ON q.user_id = u.id -- Join with the users table to get user details
		 LEFT JOIN quiz_likes ql ON q.id = ql.quiz_id
		 LEFT JOIN quiz_play_histories qph ON q.id = qph.quiz_id
WHERE q.visibility = 'public'
GROUP BY q.id, q.name, q.description, q.visibility, q.user_id, q.created_at, u.id, u.display_name
ORDER BY q.created_at DESC;
	`,
		{
			replacements: [userId],
			type: "SELECT",
		},
	);
	return result;
};

// Community: Get all favorite quizzes by a specific user with like count, play count, and user details
const getFavoriteQuizzes = async (userId) => {
	const result = await sequelize.query(
		`
SELECT
    q.id AS quiz_id,
    q.name,
    q.description,
    q.visibility,
    JSON_ARRAY_LENGTH(q.questions::json) AS total_questions, -- Cast questions to JSON if stored as text
    COUNT(DISTINCT ql.id) AS like_count, -- Count of likes for the quiz
    COUNT(DISTINCT qph.id) AS play_count, -- Count of plays for the quiz
    u.id AS user_id, -- User ID of the quiz creator
    u.display_name AS user_display_name, -- Display name of the quiz creator
    CASE
        WHEN q.user_id = ? THEN 'Public' -- Replace 1 with the specific user ID
        ELSE 'Community'
    END AS status,
    q.created_at,
    qf.created_at AS favorited_at -- Timestamp of when the quiz was favorited
FROM quiz_favorites qf
JOIN quizzes q ON qf.quiz_id = q.id -- Join with quizzes table to get quiz details
JOIN users u ON q.user_id = u.id -- Join with the users table to get quiz creator details
LEFT JOIN quiz_likes ql ON q.id = ql.quiz_id -- Join with quiz_likes to count likes
LEFT JOIN quiz_play_histories qph ON q.id = qph.quiz_id -- Join with quiz_play_histories to count plays
WHERE qf.user_id = 1 -- Replace ? with the specific user ID
GROUP BY q.id, q.name, q.description, q.visibility, q.user_id, q.created_at, u.id, u.display_name, qf.created_at
ORDER BY qf.created_at DESC;
	`,
		{
			replacements: [userId],
			type: QueryTypes.SELECT,
		},
	);
	return result;
};

// Quizzes: Get all quizzes created by a specific user with total questions, like count, and play count
const getUserQuizzes = async (userId) => {
	const result = await sequelize.query(
		`
SELECT
    q.id AS quiz_id,
    q.name,
    q.description,
    q.visibility,
    JSON_ARRAY_LENGTH(q.questions::json) AS total_questions, -- Cast questions to JSON if stored as text
    COUNT(DISTINCT ql.id) AS like_count, -- Count of likes for the quiz
    COUNT(DISTINCT qph.id) AS play_count, -- Count of plays for the quiz
    q.created_at
FROM quizzes q
LEFT JOIN quiz_likes ql ON q.id = ql.quiz_id -- Join with quiz_likes to count likes
LEFT JOIN quiz_play_histories qph ON q.id = qph.quiz_id -- Join with quiz_play_histories to count plays
WHERE q.user_id = ? -- Replace ? with the specific user ID
GROUP BY q.id, q.name, q.description, q.visibility, q.created_at
ORDER BY q.created_at DESC;
	`,
		{
			replacements: [userId],
			type: QueryTypes.SELECT,
		},
	);
	return result;
};

// Quizzes: Get all quizzes created by a specific user with total questions, like count, play count, and visibility filter
const getUserQuizzesByVisibility = async (userId, visibility) => {
	const result = await sequelize.query(
		`
SELECT
    q.id AS quiz_id,
    q.name,
    q.description,
    q.visibility,
    JSON_ARRAY_LENGTH(q.questions::json) AS total_questions, -- Cast questions to JSON if stored as text
    COUNT(DISTINCT ql.id) AS like_count, -- Count of likes for the quiz
    COUNT(DISTINCT qph.id) AS play_count, -- Count of plays for the quiz
    q.created_at
FROM quizzes q
LEFT JOIN quiz_likes ql ON q.id = ql.quiz_id -- Join with quiz_likes to count likes
LEFT JOIN quiz_play_histories qph ON q.id = qph.quiz_id -- Join with quiz_play_histories to count plays
WHERE q.user_id = ? -- Replace ? with the specific user ID
  AND q.visibility = ? -- Replace ? with 'public' or 'private' to filter by visibility
GROUP BY q.id, q.name, q.description, q.visibility, q.created_at
ORDER BY q.created_at DESC;
	`,
		{
			replacements: [userId, visibility],
			type: QueryTypes.SELECT,
		},
	);
	return result;
};

export {
	getQuizStatistics,
	getRecentlyViewedQuizzes,
	getLeaderboard,
	getPublicQuizzes,
	getFavoriteQuizzes,
	getUserQuizzes,
	getUserQuizzesByVisibility,
};
