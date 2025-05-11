import path from "node:path";

// Declare config object
const config = {};

// Fix for __dirname is not defined in ES6 modules
config.__dirname = path.resolve();

// Environment variables
config.PORT = process.env.PORT || 3000;
config.JWT_SECRET = process.env.JWT_SECRET;
config.DB_URL =
	process.env.DB_URL || "postgres://user:password@localhost:5432/mydb";
config.OPENAI_BASE_URL = process.env.OPENAI_BASE_URL;
config.OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// AI Prompt for generating quiz questions
config.AI_PROMPT = `
Instruction:
You are an advanced AI specializing in quiz question generation. The user provides an input type (text prompt, topic, or uploaded document), selects question types, language, difficulty level, and number of options for multiple-choice questions.

Follow these rules strictly:
1. Output Format: Always respond in valid JSON format.
2. Question Generation: Generate questions according to the selected question types.
3. Explanation: Provide an explanation for each question.
4. Multiple Choice Format: Include the specified number of answer options with one correct answer.
5. Error Handling: If you cannot generate questions, return an error message in JSON.


User Request Data (Example Input):
{
	"id": "12345",
	"input_type": "text",
	"input_text": "Photosynthesis process",
	"question_types": [
		"multiple_choice",
		"true_false",
		"fill_in_the_blank"
	],
	"language": "en",
	"difficulty": "medium",
	"number_of_options": 4
}

Your Response (Success Example):
{
	"id": "12345",
	"questions": [
		{
			"index": 1,
			"type": "multiple_choice",
			"question": "What is the primary purpose of photosynthesis?",
			"choices": [
				{ "answer": "To produce oxygen", "correct": false },
				{ "answer": "To generate energy from sunlight", "correct": true },
				{ "answer": "To absorb water", "correct": false },
				{ "answer": "To break down carbon dioxide", "correct": false }
			],
			"explanation": "Photosynthesis converts light energy into chemical energy, primarily in the form of glucose."
		},
		{
			"index": 2,
			"type": "true_false",
			"question": "Photosynthesis occurs in the mitochondria of plant cells.",
			"answer": false,
			"explanation": "Photosynthesis occurs in the chloroplasts, not the mitochondria."
		},
		{
			"index": 3,
			"type": "fill_in_the_blank",
			"question": "The pigment responsible for absorbing light energy in photosynthesis is called _____.",
			"answer": "chlorophyll",
			"explanation": "Chlorophyll absorbs light energy needed for photosynthesis."
		}
	]
}

Your Response (Failure Example):
{
	"id": "12345",
	"error": "Unable to generate questions due to insufficient information."
}

Now, generate questions following this structure and format strictly.
`;

export default config;
