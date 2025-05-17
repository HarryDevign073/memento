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
		const res = await this.getList<QuizzListResponse, QuizzQuery>("users/me/quizzes", query);
		return res;
	}

	async getListQuizz(query: QuizzQuery): Promise<QuizzListResponse[]> {
		const res = await this.getList<QuizzListResponse, QuizzQuery>("quizzes", query);
		return res;
	}

	async createQuizz(data: CreateQuizzRequest): Promise<CreateQuizzResponse> {
		const res = await this.post<CreateQuizzResponse, CreateQuizzRequest>("quizzes", data);
		return res;
	}

	async deleteQuizz() {}

	async getQuizzDetailsById(id: string): Promise<QuizzDetails[]> {
		const res = await this.get<QuizzDetails[]>("quizzes", id);
		return res;
	}

	async updateQuizz() {}

	async likeQuizz(quizId: number): Promise<any> {
		const res = await this.post<any, number>(`quizzes/${quizId}/like`);
		return res;
	}

	async sendQuizzUnlike() {}

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

		let formData = new FormData();

		// If the input type is file, we need to append the file to the form data
		if (data.input_type === "file") {
			delete (payload as any).input_text;
			delete (payload as any).input_topic;

			Object.keys(payload).forEach((key) => {
				formData.append(key, payload[key as keyof GenerateQuestion]);
			});

			const file = (data as FileQuestion).input_file as File;
			const buffer = Buffer.from(await file.arrayBuffer());

			formData.append("input_file", new Blob([buffer], { type: file.type }), file.name);
		}

		const res = await this.post<Quizz, GenerateQuestion>(
			`quizzes/${quizId}/generate-questions`,
			data,
			data.input_type === "file" ? formData : payload,
			data.input_type === "file"
		);
		return res;
	}
}
