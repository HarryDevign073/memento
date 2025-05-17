import { DashboardService } from "@/services/dashboard.service";

import { Leaderboard, RecentQuery, Statistics } from "@/types/dashboard";
import { HttpResponse } from "@/types/http";

import { getErrorMessage } from "@/utils/error";

export const getRecentQuizzes = async (query: RecentQuery): Promise<any[] | HttpResponse> => {
	try {
		const dashboardService = new DashboardService();
		const res = await dashboardService.getRecentQuizzes(query);
		return res;
	} catch (error: any) {
		return getErrorMessage(error);
	}
};

export const getStatistics = async (): Promise<Statistics | HttpResponse> => {
	try {
		const dashboardService = new DashboardService();
		const res = await dashboardService.getStatistics();
		return res;
	} catch (error: any) {
		return getErrorMessage(error);
	}
};

export const getLeaderboard = async (): Promise<Leaderboard[] | HttpResponse> => {
	try {
		const dashboardService = new DashboardService();
		const res = await dashboardService.getLeaderboard();
		return res;
	} catch (error: any) {
		return getErrorMessage(error);
	}
};
