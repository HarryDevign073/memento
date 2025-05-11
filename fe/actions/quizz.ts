"use server";

import { QuizzService } from "@/services/quizz.service";

import {
	CreateQuizzRequest,
	GenerateQuestion,
	Question,
	Quizz,
	QuizzDetails,
	QuizzError,
	QuizzQuery,
	SaveQuizzResponse,
} from "@/types/quizz";

export const getListQuizz = async (query: QuizzQuery) => {
	const quizzService = new QuizzService();
	const res = await quizzService.getListQuizz(query);
	return res;
};

export const createQuizz = async (data: CreateQuizzRequest) => {
	const quizzService = new QuizzService();
	const res = await quizzService.createQuizz(data);
	return res;
};

export const generateQuestion = async (data: GenerateQuestion, quizId: number): Promise<Quizz | QuizzError> => {
	const quizzService = new QuizzService();
	const res = await quizzService.generateQuestion(data, quizId);
	return res;
};

export const getQuizzDetailsById = async (id: string): Promise<QuizzDetails[]> => {
	const quizzService = new QuizzService();
	const res = await quizzService.getQuizzDetailsById(id);
	return res;
};

export const saveQuestion = async (data: Question[], quizId: number): Promise<SaveQuizzResponse[]> => {
	const quizzService = new QuizzService();
	const res = await quizzService.saveQuestion(data, quizId);
	return res;
};