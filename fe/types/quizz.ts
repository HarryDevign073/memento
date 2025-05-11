import { z } from "zod";

export const createQuizzRequest = z.object({
	name: z.string().min(1).max(100),
	description: z.string().min(1).max(1000),
	visibility: z.enum(["public", "private"]),
});

export type CreateQuizzRequest = z.infer<typeof createQuizzRequest>;

export const createQuizzResponse = z.object({
	created_at: z.string(),
	updated_at: z.string(),
	id: z.number(),
	user_id: z.number(),
	name: z.string(),
	description: z.string(),
	visibility: z.enum(["public", "private"]),
	questions: z.array(z.string()),
	created_by: z.number(),
	updated_by: z.number(),
});

export type CreateQuizzResponse = z.infer<typeof createQuizzResponse>;

export const questionType = z.enum(["multiple_choice", "true_false", "fill_in_the_blank"]);
export type QuestionType = z.infer<typeof questionType>;

export const questionInputType = z.enum(["text", "topic", "file"]);
export type QuestionInputType = z.infer<typeof questionInputType>;

export const textQuestion = z.object({
	input_type: questionInputType,
	input_text: z.string(),
	question_type: z.array(questionType),
	language: z.string(),
	difficulty: z.enum(["easy", "medium", "hard"]),
	number_of_options: z.enum(["3", "4", "5", "6"]),
});

export type TextQuestion = z.infer<typeof textQuestion>;

export const fileQuestion = z.object({
	input_type: questionInputType,
	input_file: z.any(),
	question_type: z.array(questionType),
	language: z.string(),
	difficulty: z.enum(["easy", "medium", "hard"]),
	number_of_options: z.enum(["3", "4", "5", "6"]),
});

export type FileQuestion = z.infer<typeof fileQuestion>;

export const generateQuestion = z.union([textQuestion, fileQuestion]);
export type GenerateQuestion = z.infer<typeof generateQuestion>;