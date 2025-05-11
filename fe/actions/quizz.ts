"use server";

import { QuizzService } from "@/services/quizz.service";

import { CreateQuizzRequest, GenerateQuestion, QuizzQuery } from "@/types/quizz";

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

export const generateQuestion = async (data: GenerateQuestion, quizId: number) => {
	const quizzService = new QuizzService();
	const res = await quizzService.generateQuestion(data, quizId);
	return res;
};