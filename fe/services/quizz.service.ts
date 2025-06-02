import { Statistics } from "@/types/dashboard";
import { BaseService } from "./base.service";

import {
	CreateQuizzRequest,
	CreateQuizzResponse,
	FileQuestion,
	GenerateQuestion,
	PlayQuizzHistory,
	PlayQuizzHistoryResponse,
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

	async getUserQuizzes(query: QuizzQuery): Promise<QuizzListResponse[]> {
		const res = await this.getList<QuizzListResponse>("users/me/quizzes", query);
		return res;
	}

	async getListQuizz(query: QuizzQuery): Promise<QuizzListResponse> {
		const res = await this.get<QuizzListResponse>("quizzes", undefined, query);
		return res;
	}

	async createQuizz(data: CreateQuizzRequest): Promise<CreateQuizzResponse> {
		const res = await this.post<CreateQuizzResponse, CreateQuizzRequest>("quizzes", data);
		return res;
	}

	async deleteQuizz(quizId: number): Promise<any> {
		const res = await this.delete(`quizzes/${quizId}`);
		return res;
	}

	async getQuizzDetailsById(id: string): Promise<QuizzDetails[]> {
		const res = await this.get<QuizzDetails[]>("quizzes", id);
		return res;
	}

	async updateQuizz(data: CreateQuizzRequest, quizId: number): Promise<CreateQuizzResponse> {
		const res = await this.patch<CreateQuizzRequest, CreateQuizzResponse>(data, "quizzes", String(quizId));
		return res;
	}

	async likeQuizz(quizId: number): Promise<any> {
		const res = await this.post<any, number>(`quizzes/${quizId}/like`);
		return res;
	}

	async unlikeQuizz(quizId: number): Promise<any> {
		const res = await this.delete(`quizzes/${quizId}/like`);
		return res;
	}

	async addPlayQuizzHistory(data: PlayQuizzHistory): Promise<PlayQuizzHistoryResponse> {
		const res = await this.post<PlayQuizzHistoryResponse, PlayQuizzHistory>(`quizzes/${data.quizz_id}/play`, data);
		return res;
	}

	async deleteQuizzQuestion() {}

	async saveQuestion(data: Question[], quizId: number): Promise<SaveQuizzResponse[]> {
		const payload = { questions: [...data] };

		const res = await this.post<SaveQuizzResponse[], Question[]>(`quizzes/${quizId}/questions`, data, payload);
		return res;
	}

	async generateQuestion(data: GenerateQuestion, quizId: number): Promise<Quizz> {
		// Remove the reduntdant fields
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

		const res = await this.post<Quizz, GenerateQuestion>(`quizzes/${quizId}/generate-questions`, data, payload);
		return res;
	}

	async getQuizStatistics(search: string): Promise<Statistics> {
		const res = await this.get<Statistics>("quizzes/stats/detail", undefined, { search });
		return res;
	}

	async addRecentView(quizId: number): Promise<{ message: string }> {
		const res = await this.post<{ message: string }, { quiz_id: number }>(`quizzes/add-recent`, { quiz_id: quizId });
		return res;
	}
}
