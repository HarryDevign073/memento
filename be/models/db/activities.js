import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Activities = sequelize.define(
	"activities",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: "users", key: "id" },
		},
		activity_type: {
			type: DataTypes.ENUM(
				"liked_quiz",
				"updated_quiz",
				"added_favorite",
				"created_quiz",
			),
			allowNull: false,
		},
		activity: { type: DataTypes.JSON, allowNull: false },
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
		tableName: "activities",
		updatedAt: false,
	},
);

export default Activities;
