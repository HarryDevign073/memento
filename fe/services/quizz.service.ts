import { BaseService } from "./base.service";

import {
	CreateQuizzRequest,
	CreateQuizzResponse,
	GenerateQuestion,
	QuizzListResponse,
	QuizzQuery,
	TextQuestion,
	TopicQuestion,
} from "@/types/quizz";

export class QuizzService extends BaseService {
	constructor() {
		super();
	}

	async getListQuizz(query: QuizzQuery): Promise<QuizzListResponse[]> {
		const res = await this.getList<QuizzListResponse, QuizzQuery>(query, "quizzes");
		return res;
	}

	async createQuizz(data: CreateQuizzRequest): Promise<CreateQuizzResponse> {
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

	async generateQuestion(data: GenerateQuestion, quizId: number) {
		switch (data.input_type) {
			case "file":
				delete (data as any).input_text;
				delete (data as any).input_topic;
				break;
			case "topic":
				delete (data as any).input_text;
				delete (data as any).input_file;
				break;
			case "text":
				delete (data as any).input_file;
				delete (data as any).input_topic;
				break;
			default:
				break;
		}

		const payload = {
			...data,
			question_types: JSON.stringify([data.question_types]),
		};

		const res = await this.post<GenerateQuestion, GenerateQuestion>(
			data,
			`quizzes/${quizId}/generate-questions`,
			payload
		);
		return res;
	}
}