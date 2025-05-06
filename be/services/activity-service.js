import Activity from "../models/db/activities";

const getActivity = async (id) => {
	return await Activity.findByPk(id);
};

const createActivity = async (activityData) => {
	return await Activity.create(activityData);
};

const updateActivity = async (id, activityData) => {
	return await Activity.update(activityData, { where: { id } });
};

const deleteActivity = async (id) => {
	return await Activity.destroy({ where: { id } });
};

export { getActivity, createActivity, updateActivity, deleteActivity };
