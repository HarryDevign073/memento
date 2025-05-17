import { z } from "zod";

import { quizz } from "./quizz";

export const userDetail = z.object({
	user_id: z.number(),
	user_username: z.string(),
	user_first_name: z.string(),
	user_last_name: z.string(),
	user_date_of_birth: z.string().nullable(),
});
export type UserDetail = z.infer<typeof userDetail>;

export const userProfile = z.object({
	user: userDetail,
	quizzes: z.array(quizz),
});
export type UserProfile = z.infer<typeof userProfile>;
