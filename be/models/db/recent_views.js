import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const RecentViews = sequelize.define(
	"recent_views",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "id" } },
		quiz_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: "quizzes", key: "id" } },
		created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
		created_by: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "id" } },
		updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
		updated_by: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "id" } },
	},
	{
		underscored: true,
		tableName: "recent_views",
	},
);

export default RecentViews;
