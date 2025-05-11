import { AuthRequest, AuthResponse, NewUserRequest } from "@/types/auth";
import { BaseService } from "./base.service";

export class AuthService extends BaseService {
	constructor() {
		super();
	}

	async signIn(data: AuthRequest): Promise<AuthResponse> {
		const res = await this.post<AuthResponse, AuthRequest>(data, "auth/login");
		return res;
	}

	async signUp(data: NewUserRequest): Promise<AuthResponse> {
		const res = await this.post<AuthResponse, NewUserRequest>(data, "auth/register");
		return res;
	}
}
