import { z } from "zod";

import { quizz } from "./quizz";

export const userDetail = z.object({
	user_id: z.number(),
	user_username: z.string(),
	user_first_name: z.string(),
	user_last_name: z.string(),
	user_date_of_birth: z.string().nullable(),
	user_occupation: z.string().nullable(),
});
export type UserDetail = z.infer<typeof userDetail>;

export const userQuizzes = z.object({
	quiz_id: z.number(),
	quiz_name: z.string(),
	quiz_description: z.string(),
	quiz_visibility: z.string(),
	quiz_questions: z.array(quizz),
	quiz_question_count: z.number(),
	quiz_play_count: z.number(),
	quiz_like_count: z.number(),
	created_at: z.string(),
});
export type UserQuizzes = z.infer<typeof userQuizzes>;

export const userProfile = z.object({
	user: userDetail,
	quizzes: z.array(userQuizzes),
});
export type UserProfile = z.infer<typeof userProfile>;

export const activityType = z.enum(["liked_quiz", "updated_quiz", "added_favorite", "created_quiz"]);

export const activity = z.object({
	id: z.number(),
	user_id: z.number().optional(),
	activity_type: activityType,
	activity: z.object({
		quiz_id: z.number(),
		quiz_name: z.string(),
	}),
	created_at: z.string(),
	created_by: z.number(),
	user: z
		.object({
			user_id: z.number(),
			user_full_name: z.string(),
		})
		.optional(),
});
export type Activity = z.infer<typeof activity>;
