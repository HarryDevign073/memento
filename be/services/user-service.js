import User from "../models/db/users";

const getUser = async (id) => {
	return await User.findByPk(id);
};

const createUser = async (userData) => {
	return User.create(userData);
};

const updateUser = async (id, userData) => {
	return await User.update(userData, { where: { id } });
};

const deleteUser = async (id) => {
	return await User.destroy({ where: { id } });
};

export { getUser, createUser, updateUser, deleteUser };
