"use server";

import { UserService } from "@/services/user.service";

import { HttpResponse } from "@/types/http";
import { Activity, UserDetail, UserProfile } from "@/types/user";

import { getErrorMessage } from "@/utils/error";

export const getUserById = async (id: number): Promise<UserProfile | HttpResponse> => {
	try {
		const userService = new UserService();
		const res = await userService.getUserById(id);
		return res;
	} catch (error: any) {
		return getErrorMessage(error);
	}
};

export const getActivities = async (): Promise<Activity[] | HttpResponse> => {
	try {
		const userService = new UserService();
		const res = await userService.getActivities();
		return res;
	} catch (error: any) {
		return getErrorMessage(error);
	}
};

export const getActivitiesByUser = async (): Promise<Activity[] | HttpResponse> => {
	try {
		const userService = new UserService();
		const res = await userService.getActivityLogsByUser();
		return res;
	} catch (error: any) {
		return getErrorMessage(error);
	}
};

export const updateProfile = async (user: UserDetail): Promise<UserDetail | HttpResponse> => {
	try {
		const userService = new UserService();
		const res = await userService.updateProfile(user);
		return res;
	} catch (error: any) {
		return getErrorMessage(error);
	}
};
