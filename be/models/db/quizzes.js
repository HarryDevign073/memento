import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Quizzes = sequelize.define(
	"quizzes",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "id" } },
		name: { type: DataTypes.TEXT, allowNull: false },
		description: { type: DataTypes.TEXT, allowNull: true },
		visibility: { type: DataTypes.ENUM("public", "private"), allowNull: false },
		questions: { type: DataTypes.JSON, allowNull: false },
		created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
		created_by: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "id" } },
		updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
		updated_by: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "id" } },
	},
	{
		underscored: true,
	},
);

export default Quizzes;
