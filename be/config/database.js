import { Sequelize } from "sequelize";
import config from "./config.js";

const sequelize = new Sequelize(config.DB_URL, {
	dialect: "postgres",
	logging: true,
	timezone: "+07:00", // Vietnam timezone
	define: {
		timestamps: true,
		underscored: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	},
});

export default sequelize;
