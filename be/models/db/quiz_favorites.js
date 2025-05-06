import { DataTypes } from "sequelize";
import sequelize from "../../config/database";

const QuizFavorites = sequelize.define(
	"quiz_favorites",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "id" } },
		quiz_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: "quizzes", key: "id" } },
		created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
		created_by: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "id" } },
	},
	{
		underscored: true,
		tableName: "quiz_favorites",
	},
);

export default QuizFavorites;
