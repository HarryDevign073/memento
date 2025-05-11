import { randomUUID } from "node:crypto";
import OpenAI from "openai";
import config from "../config/config.js";

const toAIPrompt = (
	input_type,
	input_text,
	question_types,
	language,
	difficulty,
	number_of_options,
) => {
	// Generate a random UUID for the request
	const uuid = randomUUID();

	const aiPrompt = {};
	aiPrompt.id = uuid;
	aiPrompt.input_type = input_type;
	aiPrompt.input_text = input_text;
	aiPrompt.question_types = question_types;
	aiPrompt.language = language;
	aiPrompt.difficulty = difficulty;
	aiPrompt.number_of_options = number_of_options;

	return JSON.stringify(aiPrompt);
};

export const generateQuestionsByText = async (
	input_text,
	question_types,
	language,
	difficulty,
	number_of_options,
) => {
	// Create a new OpenAI client
	const client = new OpenAI({
		baseURL: config.OPENAI_BASE_URL,
		apiKey: config.OPENAI_API_KEY,
	});

	// Call the OpenAI API to generate questions
	const completion = await client.chat.completions.create({
		model: "deepseek/deepseek-r1:free",
		messages: [
			{
				role: "system",
				content: config.AI_PROMPT,
			},
			{
				role: "user",
				content: toAIPrompt(
					"text",
					input_text,
					question_types,
					language,
					difficulty,
					number_of_options,
				),
			},
		],
	});

	const trimmed = completion.choices[0].message.content.replace(
		/^```json\s*|\s*```$/g,
		"",
	);

	return JSON.parse(trimmed);
};

export const generateQuestionsByTopic = async (
	topic_text,
	question_types,
	language,
	difficulty,
	number_of_options,
) => {
	// Create a new OpenAI client
	const client = new OpenAI({
		baseURL: config.OPENAI_BASE_URL,
		apiKey: config.OPENAI_API_KEY,
	});

	// Call the OpenAI API to generate questions
	const completion = await client.chat.completions.create({
		model: "deepseek/deepseek-r1:free",
		messages: [
			{
				role: "system",
				content: config.AI_PROMPT,
			},
			{
				role: "user",
				content: toAIPrompt(
					"topic",
					topic_text,
					question_types,
					language,
					difficulty,
					number_of_options,
				),
			},
		],
	});

	const trimmed = completion.choices[0].message.content.replace(
		/^```json\s*|\s*```$/g,
		"",
	);

	return JSON.parse(trimmed);
};

export const generateQuestionsByFile = async (
	file_text,
	question_types,
	language,
	difficulty,
	number_of_options,
) => {
	// Create a new OpenAI client
	const client = new OpenAI({
		baseURL: config.OPENAI_BASE_URL,
		apiKey: config.OPENAI_API_KEY,
	});

	// Call the OpenAI API to generate questions
	const completion = await client.chat.completions.create({
		model: "deepseek/deepseek-r1:free",
		messages: [
			{
				role: "system",
				content: config.AI_PROMPT,
			},
			{
				role: "user",
				content: toAIPrompt(
					"file",
					file_text,
					question_types,
					language,
					difficulty,
					number_of_options,
				),
			},
		],
	});

	const trimmed = completion.choices[0].message.content.replace(
		/^```json\s*|\s*```$/g,
		"",
	);

	return JSON.parse(trimmed);
};
