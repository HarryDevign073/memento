import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.js";
import * as leaderboardService from "../services/leaderboard-service.js";

const router = Router();

router.get("/", authenticateToken, async (req, res) => {
	const result = await leaderboardService.getLeaderboard();

	res.status(200).json(result);
});

export default router;
