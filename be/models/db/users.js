import { DataTypes } from "sequelize";
import sequelize from "../../config/database";

const Users = sequelize.define(
	"users",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		username: { type: DataTypes.TEXT, allowNull: false, unique: true },
		hashed_password: { type: DataTypes.TEXT, allowNull: false },
		display_name: { type: DataTypes.TEXT, allowNull: false },
		first_name: { type: DataTypes.TEXT, allowNull: false },
		last_name: { type: DataTypes.TEXT, allowNull: false },
		date_of_birth: { type: DataTypes.DATE, allowNull: false },
		created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
		created_by: { type: DataTypes.INTEGER, allowNull: true, references: { model: "users", key: "id" } },
		updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
		updated_by: { type: DataTypes.INTEGER, allowNull: true, references: { model: "users", key: "id" } },
	},
	{
		underscored: true,
		tableName: "users",
	},
);

export default Users;
