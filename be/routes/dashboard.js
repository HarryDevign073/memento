import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.js";
import * as dashboardService from "../services/dashboard-service.js";

const router = Router();

router.get("/stats", authenticateToken, async (req, res) => {
	const user_id = req.user._id;

	const result = await dashboardService.getQuizStatistics(user_id);

	res.status(200).json(result);
});

router.get("/recent", authenticateToken, async (req, res) => {
	const user_id = req.user._id;
	const { visibility } = req.query;

	if (!visibility) {
		return res.status(400).json({ error: "Visibility are required" });
	}

	const result = await dashboardService.getRecentlyViewedQuizzes(
		user_id,
		visibility,
	);

	res.status(200).json(result);
});

export default router;
