import { BaseService } from "./base.service";

import { Activity, UserDetail, UserProfile } from "@/types/user";

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

	async updateProfile(user: UserDetail): Promise<UserDetail> {
		const payload = {
			first_name: user.user_first_name,
			last_name: user.user_last_name,
			occupation: user.user_occupation,
		};
		const res = await this.patch<UserDetail, UserDetail>(user, "users/me/update-profile", "", payload);
		return res;
	}
}
