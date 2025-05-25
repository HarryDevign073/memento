"use server";

import { QuizzService } from "@/services/quizz.service";
import { Statistics } from "@/types/dashboard";

import { HttpResponse } from "@/types/http";
import {
	CreateQuizzRequest,
	CreateQuizzResponse,
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

import { getErrorMessage } from "@/utils/error";

export const getListQuizz = async (query: QuizzQuery): Promise<QuizzListResponse | HttpResponse> => {
	try {
		const quizzService = new QuizzService();
		const res = await quizzService.getListQuizz(query);
		return res;
	} catch (error: any) {
		return getErrorMessage(error);
	}
};

export const createQuizz = async (data: CreateQuizzRequest): Promise<CreateQuizzResponse | HttpResponse> => {
	try {
		const quizzService = new QuizzService();
		const res = await quizzService.createQuizz(data);
		return res;
	} catch (error: any) {
		return getErrorMessage(error);
	}
};

export const generateQuestion = async (data: GenerateQuestion, quizId: number): Promise<Quizz | HttpResponse> => {
	try {
		const quizzService = new QuizzService();
		const res = await quizzService.generateQuestion(data, quizId);
		return res;
	} catch (error: any) {
		return getErrorMessage(error);
	}
};

export const getQuizzDetailsById = async (id: string): Promise<QuizzDetails[] | HttpResponse> => {
	try {
		const quizzService = new QuizzService();
		const res = await quizzService.getQuizzDetailsById(id);
		return res;
	} catch (error: any) {
		return getErrorMessage(error);
	}
};

export const saveQuestion = async (data: Question[], quizId: number): Promise<SaveQuizzResponse[] | HttpResponse> => {
	try {
		const quizzService = new QuizzService();
		const res = await quizzService.saveQuestion(data, quizId);
		return res;
	} catch (error: any) {
		return getErrorMessage(error);
	}
};

export const addPlayQuizzHistory = async (data: PlayQuizzHistory): Promise<PlayQuizzHistoryResponse | HttpResponse> => {
	try {
		const quizzService = new QuizzService();
		const res = await quizzService.addPlayQuizzHistory(data);
		return res;
	} catch (error: any) {
		return getErrorMessage(error);
	}
};

export const likeQuizz = async (quizId: number): Promise<any | HttpResponse> => {
	try {
		const quizzService = new QuizzService();
		const res = await quizzService.likeQuizz(quizId);
		return res;
	} catch (error: any) {
		return getErrorMessage(error);
	}
};

export const unlikeQuizz = async (quizId: number): Promise<any | HttpResponse> => {
	try {
		const quizzService = new QuizzService();
		const res = await quizzService.unlikeQuizz(quizId);
		return res;
	} catch (error: any) {
		return getErrorMessage(error);
	}
};

export const getQuizStatistics = async (search: string): Promise<Statistics | HttpResponse> => {
	try {
		const quizzService = new QuizzService();
		const res = await quizzService.getQuizStatistics(search);
		return res;
	} catch (error: any) {
		return getErrorMessage(error);
	}
};

export const deleteQuizz = async (quizId: number): Promise<any | HttpResponse> => {
	try {
		const quizzService = new QuizzService();
		const res = await quizzService.deleteQuizz(quizId);
		return res;
	} catch (error: any) {
		return getErrorMessage(error);
	}
};

export const updateQuizz = async (
	data: CreateQuizzRequest,
	quizId: number
): Promise<CreateQuizzResponse | HttpResponse> => {
	try {
		const quizzService = new QuizzService();
		const res = await quizzService.updateQuizz(data, quizId);
		return res;
	} catch (error: any) {
		return getErrorMessage(error);
	}
};

export const addRecentView = async (quizId: number): Promise<{ message: string } | HttpResponse> => {
	try {
		const quizzService = new QuizzService();
		const res = await quizzService.addRecentView(quizId);
		return res;
	} catch (error: any) {
		return getErrorMessage(error);
	}
};
