import { AuthRequest, AuthResponse, NewUserRequest } from "@/types/auth";
import { BaseService } from "./base.service";

export interface INewUserRequest {
	first_name: string;
	last_name: string;
	username: string;
	password: string;
}

export class AuthService extends BaseService {
	constructor() {
		super();
	}

	async signIn(data: AuthRequest): Promise<AuthResponse> {
		const res = await this.post<AuthResponse, AuthRequest>(data, "auth/login");
		return res;
	}

	async signUp(data: INewUserRequest): Promise<AuthResponse> {
		const res = await this.post<AuthResponse, INewUserRequest>(data, "auth/register");
		return res;
	}
}