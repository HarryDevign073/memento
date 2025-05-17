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

	async addPlayQuizzHistory(data: PlayQuizzHistory): Promise<PlayQuizzHistoryResponse> {
		const res = await this.post<PlayQuizzHistoryResponse, PlayQuizzHistory>(data, `quizzes/${data.quizz_id}/play`);
		return res;
	}

	async deleteQuizzQuestion() {}

	async saveQuestion(data: Question[], quizId: number): Promise<SaveQuizzResponse[]> {
		const payload = { questions: [...data] };

		const res = await this.post<SaveQuizzResponse[], Question[]>(data, `quizzes/${quizId}/questions`, payload);
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
			data,
			`quizzes/${quizId}/generate-questions`,
			data.input_type === "file" ? formData : payload,
			data.input_type === "file"
		);
		return res;
	}
}
