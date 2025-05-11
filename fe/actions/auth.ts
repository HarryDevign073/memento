"use server";

import { cookies } from "next/headers";

import { AuthService } from "@/services/auth.service";
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
	const authService = new AuthService();
	const res = await authService.signUp(data);
	return res;
};
