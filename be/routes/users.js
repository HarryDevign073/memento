import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.js";
import * as usersService from "../services/users-service.js";

const router = Router();

router.get("/activities-by-user", authenticateToken, async (req, res) => {
	const user_id = req.user._id;

	const result = await usersService.getActivityLogsByUser(user_id);

	res.status(200).json(result);
});

router.get("/activities", authenticateToken, async (req, res) => {
	const result = await usersService.getAllActivityLogs();

	res.status(200).json(result);
});

router.get("/:user_id", authenticateToken, async (req, res) => {
	const user_id = req.params.user_id;

	const userProfile = await usersService.getUserProfile(Number(user_id));
	const userQuizzes = await usersService.getUserQuizzes(Number(user_id));

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

router.patch("/me/update-profile", authenticateToken, async (req, res) => {
	const user_id = req.user._id;

	const { first_name, last_name, occupation } = req.body;

	if (!first_name && !last_name && !occupation) {
		return res.status(400).json({ message: "No fields to update" });
	}

	if (
		occupation &&
		!["student", "teacher", "developer", "designer", "marketer", "manager", "writer", "other"].includes(occupation)
	) {
		return res.status(400).json({ message: "Invalid occupation" });
	}

	const result = await usersService.updateUserProfile(user_id, first_name, last_name, occupation);

	if (!result) {
		return res.status(400).json({ message: "Failed to update profile" });
	}

	const userProfile = await usersService.getUserProfile(Number(user_id));

	res.status(200).json(userProfile);
});

export default router;
