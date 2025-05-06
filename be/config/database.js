import { Sequelize } from "sequelize";
import * as config from "./index.js";

const sequelize = new Sequelize(config.DB_URL, {
	dialect: "postgres",
	logging: true,
});

export default sequelize;
