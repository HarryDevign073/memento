import { QueryTypes } from "sequelize";
import sequelize from "../config/database.js";
import Activities from "../models/db/activities.js";
import { getQuizById } from "./quizzes-service.js";

export const getActivityLogsByUser = async (userId) => {
	const result = await Activities.findAll({
		where: {
			user_id: userId,
		},
		order: [["created_at", "DESC"]],
	});

	const uniqueQuizzes = [...new Set(result.map((activity) => activity.activity.quiz_id))];

	const quizzes = await Promise.all(
		uniqueQuizzes.map(async (quizId) => {
			const quiz = await getQuizById(quizId);
			return quiz?.[0];
		})
	);

	return result.map((activity) => {
		const quizDetail = quizzes.find((quiz) => quiz.quiz_id == activity.activity.quiz_id);

		const activityValues = activity.dataValues;
		delete activityValues.user_id;

		return {
			...activityValues,
			activity: {
				...activityValues.activity,
				quiz_name: quizDetail?.quiz_name,
			},
		};
	});
};

export const getAllActivityLogs = async () => {
	const result = await Activities.findAll({
		order: [["created_at", "DESC"]],
	});

	const uniqueUsers = [...new Set(result.map((activity) => activity.user_id))];

	const userProfiles = await Promise.all(
		uniqueUsers.map(async (userId) => {
			const profile = await getUserProfile(userId);
			return profile;
		})
	);

	const uniqueQuizzes = [...new Set(result.map((activity) => activity.activity.quiz_id))];

	const quizzes = await Promise.all(
		uniqueQuizzes.map(async (quizId) => {
			const quiz = await getQuizById(quizId);
			return quiz?.[0];
		})
	);

	return result.map((activity) => {
		const userProfile = userProfiles.find((user) => user.user_id === activity.user_id);

		let fullName = "";
		if (userProfile?.user_first_name && userProfile?.user_last_name) {
			fullName = `${userProfile.user_first_name} ${userProfile.user_last_name}`;
		} else if (userProfile?.user_first_name) {
			fullName = userProfile.user_first_name;
		} else if (userProfile?.user_last_name) {
			fullName = userProfile.user_last_name;
		}

		const activityValues = activity.dataValues;
		delete activityValues.user_id;

		const quizDetail = quizzes.find((quiz) => quiz.quiz_id == activityValues.activity.quiz_id);

		const res = {
			...activityValues,
			activity: {
				...activityValues.activity,
				quiz_name: quizDetail?.quiz_name,
			},
			user: {
				user_id: userProfile.user_id,
				user_full_name: fullName,
			},
		};

		return res;
	});
};

export const getUserProfile = async (userId) => {
	const result = await sequelize.query(
		`
			SELECT
				u.id AS user_id,
				u.username AS user_username,
				u.first_name AS user_first_name,
				u.last_name AS user_last_name,
				u.date_of_birth AS user_date_of_birth,
				u.occupation AS user_occupation
			FROM users u
			WHERE u.id = :userId
		`,
		{
			replacements: { userId },
			type: QueryTypes.SELECT,
			plain: true, // Get a single result
		}
	);

	// Format the result to match the expected response structure
	return result;
};

export const getUserQuizzes = async (userId, filter, search) => {
	// Construct the filter clause based on the filter parameter
	let filterClause;
	if (filter === "public") {
		filterClause = "AND q.visibility = 'public'";
	} else if (filter === "private") {
		filterClause = "AND q.visibility = 'private'";
	} else {
		filterClause = "";
	}

	// Construct the search clause based on the search parameter
	const searchClause = search
		? `AND (LOWER(q.name) LIKE LOWER('%${search}%') OR LOWER(q.description) LIKE LOWER('%${search}%'))`
		: "";

	// Construct the SQL query
	const additionalClause = filterClause + searchClause;

	const result = await sequelize.query(
		`
SELECT
    q.id AS quiz_id,
    q.name AS quiz_name,
    q.description AS quiz_description,
    q.visibility AS quiz_visibility,
    q.questions AS quiz_questions, -- Assuming questions is a JSON column
    JSON_ARRAY_LENGTH(q.questions::json) AS quiz_question_count, -- Cast questions to JSON if stored as text
		COUNT(DISTINCT qph.id) AS quiz_play_count, -- Count of plays for the quiz
    COUNT(DISTINCT ql.id) AS quiz_like_count, -- Count of likes for the quiz
    q.created_at
FROM quizzes q
LEFT JOIN quiz_likes ql ON q.id = ql.quiz_id -- Join with quiz_likes to count likes
LEFT JOIN quiz_play_histories qph ON q.id = qph.quiz_id -- Join with quiz_play_histories to count plays
WHERE q.user_id = :userId ${additionalClause}
GROUP BY q.id, q.name, q.description, q.visibility, q.created_at
ORDER BY q.created_at DESC;
	`,
		{
			replacements: {
				userId,
			},
			type: QueryTypes.SELECT,
		}
	);

	// Format the result to match the expected response structure
	return result.map((data) => ({
		...data,
		quiz_question_count: Number(data.quiz_question_count),
		quiz_play_count: Number(data.quiz_play_count),
		quiz_like_count: Number(data.quiz_like_count),
	}));
};

export const updateUserProfile = async (userId, first_name, last_name, occupation) => {
	const updateFields = [];

	if (first_name) {
		updateFields.push(`first_name = :first_name`);
	}
	if (last_name) {
		updateFields.push(`last_name = :last_name`);
	}
	if (occupation) {
		updateFields.push(`occupation = :occupation`);
	}

	const result = await sequelize.query(
		`
			UPDATE users SET ${updateFields.join(", ")} WHERE id = :userId
		`,
		{
			replacements: { userId, first_name, last_name, occupation },
			type: QueryTypes.UPDATE,
		}
	);

	return !!result.length;
};
