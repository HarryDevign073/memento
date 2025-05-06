import express from "express";
import fileupload from "express-fileupload";
import config from "./config/config.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { default as authRoutes } from "./routes/auth.js";
import { default as dashboardRoutes } from "./routes/dashboard.js";
import { default as leaderboardsRoutes } from "./routes/leaderboards.js";
import { default as quizzesRoutes } from "./routes/quizzes.js";
import { default as usersRoutes } from "./routes/users.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(
	fileupload({
		limits: { fileSize: 5 * 1024 * 1024 },
	})
);

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/leaderboards", leaderboardsRoutes);
app.use("/quizzes", quizzesRoutes);
app.use("/users", usersRoutes);

app.use(errorHandler);

app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));