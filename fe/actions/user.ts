"use server";

import { UserService } from "@/services/user.service";

import { HttpResponse } from "@/types/http";
import { UserProfile } from "@/types/user";

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
