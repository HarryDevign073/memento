import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.js";
import * as usersService from "../services/users-service.js";

const router = Router();

router.get("/activities", authenticateToken, async (req, res) => {
	const user_id = req.user._id;

	const result = await usersService.getUserActivityLogs(user_id);

	res.status(200).json(result);
});

router.get("/:user_id", authenticateToken, async (req, res) => {
	const user_id = req.params.user_id;
	const userProfile = await usersService.getUserProfile(user_id);
	const userQuizzes = await usersService.getUserQuizzes(user_id, "public");

	res.status(200).json({
		user: userProfile,
		quizzes: userQuizzes,
	});
});

router.get("/me/quizzes", authenticateToken, async (req, res) => {
	const user_id = req.user._id;
	const { filter, search } = req.query;

	const result = await usersService.getUserQuizzes(user_id, filter, search);

	res.status(200).json(result);
});

export default router;
