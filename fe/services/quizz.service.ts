import { BaseService } from "./base.service";

import { CreateQuizzRequest, CreateQuizzResponse } from "@/types/quizz";

export class QuizzService extends BaseService {
	constructor() {
		super();
	}

	async getListQuizz() {}

	async createQuizz(data: CreateQuizzRequest) {
		const res = await this.post<CreateQuizzResponse, CreateQuizzRequest>(data, "quizzes");
		return res;
	}

	async deleteQuizz() {}

	async getQuizzDetail() {}

	async updateQuizz() {}

	async sendQuizzLike() {}

	async sendQuizzUnlike() {}

	async createQuizzPlay() {}

	async deleteQuizzQuestion() {}

	async saveQuestion() {}
}