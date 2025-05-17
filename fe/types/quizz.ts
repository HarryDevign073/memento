import { z } from "zod";

export const quizzVisibility = z.enum(["public", "private"]);
export type QuizzVisibility = z.infer<typeof quizzVisibility>;

export const createQuizzRequest = z.object({
	name: z.string().min(1).max(100),
	description: z.string().min(1).max(1000),
	visibility: quizzVisibility,
});
export type CreateQuizzRequest = z.infer<typeof createQuizzRequest>;

export const createQuizzResponse = z.object({
	created_at: z.string(),
	updated_at: z.string(),
	id: z.number(),
	user_id: z.number(),
	name: z.string(),
	description: z.string(),
	visibility: quizzVisibility,
	questions: z.array(z.string()),
	created_by: z.number(),
	updated_by: z.number(),
});
export type CreateQuizzResponse = z.infer<typeof createQuizzResponse>;

export const questionType = z.enum(["multiple_choice", "true_false", "fill_in_the_blank"]);
export type QuestionType = z.infer<typeof questionType>;

export const questionInputType = z.enum(["text", "topic", "file"]);
export type QuestionInputType = z.infer<typeof questionInputType>;

export const basicQuestion = z.object({
	input_type: questionInputType,
	question_types: questionType.default("multiple_choice"),
	language: z.string(),
	difficulty: z.enum(["easy", "medium", "hard"]),
	number_of_options: z.enum(["3", "4", "5", "6"]),
});
export type BasicQuestion = z.infer<typeof basicQuestion>;

export const textQuestion = z.object({
	input_text: z.string(),
	...basicQuestion.shape,
});
export type TextQuestion = z.infer<typeof textQuestion>;

export const topicQuestion = z.object({
	input_topic: z.string(),
	...basicQuestion.shape,
});
export type TopicQuestion = z.infer<typeof topicQuestion>;

export const fileQuestion = z.object({
	input_file: z.instanceof(File).optional(),
	...basicQuestion.shape,
});
export type FileQuestion = z.infer<typeof fileQuestion>;

export const generateQuestion = z.union([textQuestion, fileQuestion, topicQuestion]);
export type GenerateQuestion = z.infer<typeof generateQuestion>;

export const quizzListResponse = z.object({
	quiz_id: z.number(),
	name: z.string(),
	description: z.string(),
	visibility: quizzVisibility,
	quiz_questions_count: z.number(),
	quiz_like_count: z.number(),
	quiz_play_count: z.number(),
	user_id: z.number(),
	user_first_name: z.string(),
	user_last_name: z.string(),
	status: z.string(),
	created_at: z.string(),
});
export type QuizzListResponse = z.infer<typeof quizzListResponse>;

export const quizzQuery = z.object({
	search: z.string().optional(),
	sort: z.enum(["desc", "asc"]).default("desc").optional(),
	filter: z.enum(["all", "favorites"]).default("all").optional(),
});
export type QuizzQuery = z.infer<typeof quizzQuery>;

export const multipleChoiceOption = z.object({
	answer: z.string(),
	correct: z.boolean(),
});

export const multipleChoiceQuestion = z.object({
	index: z.number(),
	type: z.literal("multiple_choice"),
	question: z.string(),
	choice: z.array(multipleChoiceOption),
	explanation: z.string(),
});
export type MultipleChoiceQuestion = z.infer<typeof multipleChoiceQuestion>;

export const trueFalseQuestion = z.object({
	index: z.number(),
	type: z.literal("true_false"),
	question: z.string(),
	answer: z.boolean(),
	explanation: z.string(),
});
export type TrueFalseQuestion = z.infer<typeof trueFalseQuestion>;

export const fillInTheBlankQuestion = z.object({
	index: z.number(),
	type: z.literal("fill_in_the_blank"),
	question: z.string(),
	answer: z.string(),
	explanation: z.string(),
});
export type FillInTheBlankQuestion = z.infer<typeof fillInTheBlankQuestion>;

export const question = z.discriminatedUnion("type", [
	multipleChoiceQuestion,
	trueFalseQuestion,
	fillInTheBlankQuestion,
]);
export type Question = z.infer<typeof question>;

export const quizz = z.object({
	id: z.string(),
	question: z.array(question),
});
export type Quizz = z.infer<typeof quizz>;

export const quizzError = z.object({
	id: z.string(),
	error: z.string(),
});
export type QuizzError = z.infer<typeof quizzError>;

export const quizzDetails = z.object({
	quiz_id: z.number(),
	quiz_name: z.string(),
	quiz_description: z.string(),
	quiz_visibility: quizzVisibility,
	quiz_questions: z.array(question),
});
export type QuizzDetails = z.infer<typeof quizzDetails>;

export const saveQuizzResponse = z.object({
	quiz_id: z.number(),
	quiz_name: z.string(),
	quiz_description: z.string(),
	quiz_visibility: quizzVisibility,
	quiz_questions: z.array(question),
	quiz_question_count: z.number(),
	quiz_play_count: z.number(),
	quiz_like_count: z.number(),
	user_id: z.number(),
	user_first_name: z.string(),
	user_last_name: z.string(),
	quiz_created_at: z.string(),
	quiz_updated_at: z.string(),
});
export type SaveQuizzResponse = z.infer<typeof saveQuizzResponse>;

export const playQuizzHistory = z.object({
	quizz_id: z.number(),
	score: z.number(),
});
export type PlayQuizzHistory = z.infer<typeof playQuizzHistory>;

export const playQuizzHistoryResponse = z.object({
	created_at: z.string(),
	id: z.number(),
	user_id: z.number(),
	quiz_id: z.number(),
	score: z.number(),
	created_by: z.number(),
});
export type PlayQuizzHistoryResponse = z.infer<typeof playQuizzHistoryResponse>;
