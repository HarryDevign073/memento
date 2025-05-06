import RecentView from "../models/db/recent_views";

const getRecentView = async (id) => {
	return await RecentView.findByPk(id);
};

const createRecentView = async (recentViewData) => {
	return await RecentView.create(recentViewData);
};

const updateRecentView = async (id, recentViewData) => {
	return await RecentView.update(recentViewData, { where: { id } });
};

const deleteRecentView = async (id) => {
	return await RecentView.destroy({ where: { id } });
};

export { getRecentView, createRecentView, updateRecentView, deleteRecentView };
