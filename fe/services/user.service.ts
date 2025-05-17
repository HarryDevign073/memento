import { BaseService } from "./base.service";

import { Activity, UserProfile } from "@/types/user";

export class UserService extends BaseService {
	constructor() {
		super();
	}

	async getUserById(id: number): Promise<UserProfile> {
		const res = await this.get<UserProfile>("users", String(id));
		return res;
	}

	async getActivities(): Promise<Activity[]> {
		const res = await this.getList<Activity>("users/activities");
		return res;
	}

	async getActivityLogsByUser(): Promise<Activity[]> {
		const res = await this.getList<Activity>("users/activities-by-user");
		return res;
	}
}
