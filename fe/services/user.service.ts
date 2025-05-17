import { BaseService } from "./base.service";

import { UserProfile } from "@/types/user";

export class UserService extends BaseService {
	constructor() {
		super();
	}

	async getUserById(id: number): Promise<UserProfile> {
		const res = await this.get<UserProfile>("users", String(id));
		return res;
	}
}
