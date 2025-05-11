"use server";

import { cookies } from "next/headers";

import { AuthService, INewUserRequest } from "@/services/auth.service";

import { AuthRequest, AuthResponse, NewUserRequest } from "@/types/auth";
import { TOKEN_KEY } from "@/constants/key";

export const signIn = async (data: AuthRequest): Promise<AuthResponse> => {
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
};

export const signUp = async (data: NewUserRequest): Promise<AuthResponse> => {
	const payload: INewUserRequest = {
		first_name: data.firstName,
		last_name: data.lastName,
		username: data.username,
		password: data.password,
	};

	const authService = new AuthService();
	const res = await authService.signUp(payload);
	return res;
};

export const logout = async () => {
	const cookieStore = await cookies();
	cookieStore.delete(TOKEN_KEY);
};