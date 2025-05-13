import { BaseService } from "./base.service";

import {
	CreateQuizzRequest,
	CreateQuizzResponse,
	GenerateQuestion,
	Question,
	Quizz,
	QuizzDetails,
	QuizzListResponse,
	QuizzQuery,
	SaveQuizzResponse,
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

	async getQuizzDetailsById(id: string): Promise<QuizzDetails[]> {
		const res = await this.get<QuizzDetails[]>(id, "quizzes");
		return res;
	}

	async updateQuizz() {}

	async sendQuizzLike() {}

	async sendQuizzUnlike() {}

	async createQuizzPlay() {}

	async deleteQuizzQuestion() {}

	async saveQuestion(data: Question[], quizId: number): Promise<SaveQuizzResponse[]> {
		const payload = { questions: [...data] };

		const res = await this.post<SaveQuizzResponse[], Question[]>(data, `quizzes/${quizId}/questions`, payload);
		return res;
	}

	async generateQuestion(data: GenerateQuestion, quizId: number): Promise<Quizz> {
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

		if (data.question_types !== "multiple_choice") {
			delete (data as any).number_of_options;
		}

		const payload = {
			...data,
			question_types: JSON.stringify([data.question_types]),
		};

		const res = await this.post<Quizz, GenerateQuestion>(data, `quizzes/${quizId}/generate-questions`, payload);
		return res;
	}
}