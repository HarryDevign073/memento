import { resolve } from "node:path";
import { getText } from "any-text";
import { Router } from "express";
import config from "../config/config.js";
import { authenticateToken } from "../middlewares/auth.js";
import * as questionService from "../services/question-service.js";
import * as quizzesService from "../services/quizzes-service.js";

const router = Router();

// Get all or favorite quizzes, with optional search & sorting
router.get("/", authenticateToken, async (req, res) => {
	const user_id = req.user._id;
	const { filter, search, sort, visibility, checkedUser } = req.query;

	// Check if user_id, filter, and sort are provided
	if (!user_id || !filter) {
		return res.status(400).json({ error: "Filter is required" });
	}

	if (visibility != undefined && !["public", "private"].includes(visibility)) {
		return res.status(400).json({ error: "Invalid visibility value" });
	}

	const statistics = await quizzesService.getQuizStatistics(user_id, search, visibility, checkedUser);

	let sortQueryValue = sort || "desc";

	if (filter === "all") {
		const result = await quizzesService.getQuizzes(user_id, search, sortQueryValue, visibility, checkedUser);
		return res.status(200).json({
			quizzes: result,
			statistics,
		});
	}

	if (filter === "favorites") {
		const result = await quizzesService.getFavoriteQuizzes(user_id, search, sort);
		return res.status(200).json({
			quizzes: result,
			statistics,
		});
	}

	return res.status(400).json({ error: "Invalid filter value" });
});

// Create a new quiz
router.post("/", authenticateToken, async (req, res) => {
	const user_id = req.user._id;
	const { name, description, visibility } = req.body;

	if (!name || !description || !visibility) {
		return res.status(400).json({ error: "All fields are required" });
	}

	const result = await quizzesService.createQuiz(user_id, name, description, visibility);

	if (!result) {
		return res.status(500).json({ error: "Failed to create quiz" });
	}

	return res.status(201).json(result);
});

// Delete a quiz
router.delete("/:quiz_id", authenticateToken, async (req, res) => {
	const { quiz_id } = req.params;

	if (!quiz_id) {
		return res.status(400).json({ error: "Quiz ID is required" });
	}

	const result = await quizzesService.deleteQuiz(quiz_id);

	if (!result) {
		return res.status(404).json({ error: "Quiz not found" });
	}

	return res.status(200).json({ error: "Quiz deleted successfully" });
});

// Get quiz details
router.get("/:quiz_id", authenticateToken, async (req, res) => {
	const { quiz_id } = req.params;

	if (!quiz_id) {
		return res.status(400).json({ error: "Quiz ID is required" });
	}

	const result = await quizzesService.getQuizById(quiz_id);

	if (!result) {
		return res.status(404).json({ error: "Quiz not found" });
	}

	return res.status(200).json(result);
});

// Update quiz details (status, name, description)
router.patch("/:quiz_id", authenticateToken, async (req, res) => {
	const user_id = req.user._id;
	const { quiz_id } = req.params;
	const { name, description, visibility } = req.body;

	if (!quiz_id || !name || !description || !visibility) {
		return res.status(400).json({ error: "All fields are required" });
	}

	const result = await quizzesService.updateQuiz(user_id, quiz_id, name, description, visibility);

	if (!result) {
		return res.status(404).json({ error: "Quiz not found" });
	}

	return res.status(200).json(result);
});

// Like a quiz
router.post("/:quiz_id/like", authenticateToken, async (req, res) => {
	const user_id = req.user._id;
	const { quiz_id } = req.params;

	if (!quiz_id) {
		return res.status(400).json({ error: "Quiz ID is required" });
	}

	const result = await quizzesService.likeQuiz(user_id, quiz_id);

	if (!result) {
		return res.status(404).json({ error: "Like failed" });
	}

	return res.status(200).json();
});

// Unlike a quiz
router.delete("/:quiz_id/like", authenticateToken, async (req, res) => {
	const user_id = req.user._id;
	const { quiz_id } = req.params;

	if (!quiz_id) {
		return res.status(400).json({ error: "Quiz ID is required" });
	}

	const result = await quizzesService.unlikeQuiz(user_id, quiz_id);

	if (!result) {
		return res.status(404).json({ error: "Unlike failed" });
	}

	return res.status(200).json();
});

// Start playing a quiz
router.post("/:quiz_id/play", authenticateToken, async (req, res) => {
	const user_id = req.user._id;
	const { quiz_id } = req.params;
	const { score } = req.body;

	if (!quiz_id) {
		return res.status(400).json({ error: "Quiz ID is required" });
	}

	const result = await quizzesService.createQuizPlayHistory(user_id, quiz_id, score);

	if (!result) {
		return res.status(404).json({ error: "Quiz not found" });
	}

	return res.status(200).json(result);
});

// Remove a question from a quiz
router.delete("/:quiz_id/questions/:questionId", authenticateToken, async (req, res) => {
	const user_id = req.user._id;
	const { quiz_id, questionId } = req.params;

	if (!quiz_id || !questionId) {
		return res.status(400).json({ error: "Quiz ID and Question ID are required" });
	}

	const result = await quizzesService.removeQuestionFromQuiz(user_id, quiz_id, questionId);

	if (!result) {
		return res.status(404).json({ error: "Quiz or Question not found" });
	}

	return res.status(200).json(result);
});

// Generate questions for a quiz
router.post("/:quiz_id/generate-questions", authenticateToken, async (req, res) => {
	const { quiz_id } = req.params;
	const { input_type, input_text, question_types, language, difficulty, number_of_options } = req.body;

	const input_file = req.files?.input_file;

	// Check if all required fields are provided
	if (!question_types || !language || !difficulty || !number_of_options) {
		return res.status(400).json({ error: "All fields are required" });
	}

	const question_types_array = JSON.parse(question_types).filter(
		(data) => data === "multiple_choice" || data === "true_false" || data === "fill_in_the_blank"
	);

	switch (input_type) {
		case "text": {
			if (!input_text) {
				return res.status(400).json({ error: "Input text is required" });
			}

			const result = await questionService.generateQuestionsByText(
				input_text,
				question_types_array,
				language,
				difficulty,
				number_of_options
			);

			return res.status(200).json(result);
		}
		case "topic": {
			if (!input_text) {
				return res.status(400).json({ error: "Input text is required" });
			}

			const result = await questionService.generateQuestionsByTopic(
				input_text,
				question_types_array,
				language,
				difficulty,
				number_of_options
			);

			return res.status(200).json(result);
		}
		case "file": {
			if (!input_file) {
				return res.status(400).json({ error: "Input file is required" });
			}

			// Generate a file path
			const filePath = resolve(config.__dirname, "uploads", input_file.name);

			// Move the file to the uploads directory
			await input_file.mv(filePath);

			// Extract text from the file
			const extractedText = await getText(filePath);

			const result = await questionService.generateQuestionsByFile(
				extractedText,
				question_types_array,
				language,
				difficulty,
				number_of_options
			);

			return res.status(200).json(result);
		}
		default:
			return res.status(400).json({ error: "Invalid input type" });
	}
});

router.post("/:quiz_id/questions", authenticateToken, async (req, res) => {
	const user_id = req.user._id;
	const { quiz_id } = req.params;
	const { questions } = req.body;

	if (!quiz_id || !questions) {
		return res.status(400).json({ error: "Quiz ID and Questions are required" });
	}

	const result = await quizzesService.saveQuestions(user_id, quiz_id, questions);

	if (!result) {
		return res.status(404).json({ error: "Quiz not found" });
	}

	return res.status(200).json(result);
});

export default router;
