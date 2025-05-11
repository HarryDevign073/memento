import Users from "../models/db/users.js";

export const getUserByUsername = async (username) => {
	return Users.findOne({
		where: { username },
		attributes: ["id", "username", "hashed_password"],
	});
};

export const isUserExisted = async (username) => {
	const result = await Users.findOne({
		where: { username },
		attributes: ["id"],
	});
	return result !== null;
};

export const registerUser = async (userData) => {
	return Users.create(userData);
};
