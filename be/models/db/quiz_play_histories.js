import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const QuizPlayHistories = sequelize.define(
	"quiz_play_histories",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: "users", key: "id" },
		},
		quiz_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: "quizzes", key: "id" },
		},
		score: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0 } },
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		created_by: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: "users", key: "id" },
		},
	},
	{
		underscored: true,
		tableName: "quiz_play_histories",
		updatedAt: false,
	},
);

export default QuizPlayHistories;
