export const auth = (req, res, next) => {
	console.log("Authentication Middleware Triggered");
	// Example: Check for an authorization header
	const authHeader = req.headers["authorization"];
	if (!authHeader) {
		return res.status(401).json({ error: "Unauthorized" });
	}
	next();
};

export default auth;
