import { z } from "zod";

export const visibility = z.enum(["public", "private"]);

export const recentQuery = z.object({
	visibility: visibility,
});
export type RecentQuery = z.infer<typeof recentQuery>;

export const statistics = z.object({
	user_quiz_count: z.number(),
	user_question_count: z.number(),
	user_play_count: z.number(),
	user_like_count: z.number(),
});
export type Statistics = z.infer<typeof statistics>;

export const leaderboard = z.object({
	user_id: z.number(),
	user_username: z.string(),
	user_first_name: z.string(),
	user_last_name: z.string(),
	quiz_like_count: z.number(),
});
export type Leaderboard = z.infer<typeof leaderboard>;
