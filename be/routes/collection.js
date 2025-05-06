import * as hs from "../services/home-service.js";
import { Router } from "express";
const router = Router();
import OpenAI from "openai";
import * as config from "../config";

const generateQuestions = async (input) => {};

async function chat() {
	const client = new OpenAI({
		baseURL: config.OPENAI_BASE_URL,
		apiKey: config.OPENAI_API_KEY,
	});

	const response = await client.chat.completions.create({
		model: "deepseek/deepseek-r1:free",
		messages: [
			{
				role: "system",
				content: config.AI_PROMPT,
			},
			{
				role: "user",
				content: `
{
  "id": "random1",
  "input_type": "topic",
  "input_text": "ReactJS",
  "question_types": [
    "multiple_choice",
    "true_false",
    "fill_in_the_blank"
  ],
  "language": "en",
  "difficulty": "medium",
  "number_of_options": 4
}
`,
			},
		],
	});

	console.log(response.choices[0].message.content);
}

router.get("/", async (req, res) => {
	await chat();
	const user = await hs.getQuizStatistics("1");
	res.json(user);
});

export default router;
