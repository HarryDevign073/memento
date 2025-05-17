import { BaseService } from "./base.service";

import { Leaderboard, RecentQuery, Statistics } from "@/types/dashboard";

export class DashboardService extends BaseService {
	constructor() {
		super();
	}

	async getRecentQuizzes(query: RecentQuery): Promise<any[]> {
		console.info("query: ", query);
		const res = await this.getList<any[]>("dashboard/recent", query);
		return res;
	}

	async getStatistics(): Promise<Statistics> {
		const res = await this.get<Statistics>("dashboard/stats");
		return res;
	}

	async getLeaderboard(): Promise<Leaderboard[]> {
		const res = await this.getList<Leaderboard>("leaderboards");
		return res;
	}
}
