"use server";

import { cookies } from "next/headers";

import { AuthService, INewUserRequest } from "@/services/auth.service";

import { AuthRequest, AuthResponse, NewUserRequest } from "@/types/auth";
import { HttpResponse } from "@/types/http";

import { TOKEN_KEY } from "@/constants/key";
import { getErrorMessage } from "@/utils/error";

export const signIn = async (data: AuthRequest): Promise<AuthResponse | HttpResponse> => {
	try {
		const authService = new AuthService();
		const res = await authService.signIn(data);

		if (res.token) {
			(await cookies()).set(TOKEN_KEY, res.token, {
				httpOnly: true,
				secure: true,
				sameSite: "strict",
			});
		}

		return res;
	} catch (error: any) {
		return getErrorMessage(error);
	}
};

export const signUp = async (data: NewUserRequest): Promise<AuthResponse | HttpResponse> => {
	try {
		const payload: INewUserRequest = {
			first_name: data.firstName,
			last_name: data.lastName,
			username: data.username,
			password: data.password,
		};

		const authService = new AuthService();
		const res = await authService.signUp(payload);
		return res;
	} catch (error: any) {
		return getErrorMessage(error);
	}
};

export const logout = async () => {
	const cookieStore = await cookies();
	cookieStore.delete(TOKEN_KEY);
};

export const getStoredToken = async (): Promise<string | null> => {
	const accessToken = (await cookies()).get(TOKEN_KEY)?.value ?? null;
	return accessToken;
};
