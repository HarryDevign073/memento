import bcrypt from "bcryptjs";
import { Router } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import authenticateToken from "../middlewares/auth.js";
import * as authService from "../services/auth-service.js";
import * as dashboardService from "../services/dashboard-service.js";
import * as quizzesService from "../services/quizzes-service.js";
import * as usersService from "../services/users-service.js";

const router = Router();

router.post("/login", async (req, res) => {
	// Get username and password from request body
	const { username, password } = req.body;

	// Get user by username
	const user = await authService.getUserByUsername(username);

	// If user is not found, return error message
	if (!user) {
		return res.status(400).json({ error: "Invalid username or password." });
	}

	// Compare password
	const validPassword = await bcrypt.compare(password, user.hashed_password);

	// If password is invalid, return error message
	if (!validPassword) {
		return res.status(400).json({ error: "Invalid username or password." });
	}

	// Generate token
	const token = jwt.sign(
		{ _id: user.id, username: user.username },
		config.JWT_SECRET,
		{ expiresIn: "30d" },
	);

	// Return token
	res.json({ token });
});

router.post("/register", async (req, res) => {
	// Get username and password from request body
	const { first_name, last_name, username, password } = req.body;

	// Validate request body
	if (!first_name || !last_name || !username || !password) {
		return res.status(400).json({
			error: "First name, last name, username and password are required.",
		});
	}

	// Validate user existence
	const existingUser = await authService.isUserExisted(username);
	if (existingUser) {
		return res.status(400).json({ error: "User already exists." });
	}

	// Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create a new user
	const user = await authService.registerUser({
		username,
		hashed_password: hashedPassword,
		first_name: first_name,
		last_name: last_name,
	});

	// Generate a JWT token
	const token = jwt.sign(
		{ _id: user.id, username: user.username },
		config.JWT_SECRET,
		{ expiresIn: "30d" },
	);

	// Return token
	res.json({ token });
});

router.get("/me", authenticateToken, async (req, res) => {
	// Get user ID from request
	const userId = req.user._id;

	const UserProfile = await usersService.getUserProfile(userId);
	const userQuizStatistics = await dashboardService.getQuizStatistics(userId);
	const userQuizzes = await quizzesService.getUserQuizzes(userId);
	const likeQuizzes = await quizzesService.getLikeQuizzes(userId);

	res.json({
		user: {
			...UserProfile,
			...userQuizStatistics,
		},
		quizzes: userQuizzes,
		likeQuizzes: likeQuizzes,
	});
});

export default router;
