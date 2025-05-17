"use server";

import { QuizzService } from "@/services/quizz.service";

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

export const getListQuizz = async (query: QuizzQuery): Promise<QuizzListResponse[] | HttpResponse> => {
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
