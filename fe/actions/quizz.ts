"use server";

import { QuizzService } from "@/services/quizz.service";

import { CreateQuizzRequest } from "@/types/quizz";

export const createQuizz = async (data: CreateQuizzRequest) => {
	const quizzService = new QuizzService();
	const res = await quizzService.createQuizz(data);
	return res;
};