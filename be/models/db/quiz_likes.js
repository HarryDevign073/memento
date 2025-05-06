import { DataTypes } from "sequelize";
import sequelize from "../../config/database";

const QuizLikes = sequelize.define(
	"quiz_likes",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "id" } },
		quiz_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: "quizzes", key: "id" } },
		created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
		created_by: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "id" } },
	},
	{
		underscored: true,
		tableName: "quiz_likes",
	},
);

export default QuizLikes;
