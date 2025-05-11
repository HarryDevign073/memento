import { QueryTypes } from "sequelize";
import sequelize from "../config/database.js";

export const getLeaderboard = async () => {
	const result = await sequelize.query(
		`
SELECT
	u.id AS user_id,
	u.username AS user_username,
	u.first_name AS user_first_name,
	u.last_name AS user_last_name,
	COUNT(ql.id) AS quiz_like_count
FROM users u
			 LEFT JOIN quizzes q ON q.user_id = u.id
			 LEFT JOIN quiz_likes ql ON ql.quiz_id = q.id
GROUP BY u.id, u.username, u.first_name, u.last_name
ORDER BY quiz_like_count DESC;
	`,
		{
			type: QueryTypes.SELECT,
		},
	);

	// Format the result to match the expected response structure
	return result.map((data) => ({
		...data,
		quiz_like_count: Number(data.quiz_like_count),
	}));
};
