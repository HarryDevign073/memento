import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const authenticateToken = (req, res, next) => {
	// Get token from header
	const token = req.header("Authorization")?.split(" ")[1];

	// Check if no token
	if (!token) {
		return res.status(401).json({ error: "Access denied. No token provided." });
	}

	try {
		// Verify token and attach user to request
		req.user = jwt.verify(token, config.JWT_SECRET);

		next();
	} catch (ex) {
		res.status(400).json({ error: "Invalid token." });
	}
};

export default authenticateToken;
