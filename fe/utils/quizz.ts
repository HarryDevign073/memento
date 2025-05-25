import { QueryClient } from "@tanstack/react-query";

import { getStoredToken } from "@/actions/auth";

import { FileQuestion, GenerateQuestion } from "@/types/quizz";

import { QUERY_KEY } from "@/constants/query-key";

export const refetchQuizz = async (queryClient: QueryClient) => {
	await Promise.all([
		queryClient.refetchQueries({ queryKey: [QUERY_KEY.USER_QUIZZ_LIST] }),
		queryClient.refetchQueries({ queryKey: [QUERY_KEY.QUIZZ_LIST] }),
		queryClient.refetchQueries({ queryKey: [QUERY_KEY.QUIZZ_COMMUNITY_RESULT] }),
	]);
};

export const generateByFile = async (data: GenerateQuestion, id: number): Promise<object> => {
	const formData = new FormData();
	formData.append("input_type", data.input_type);
	formData.append("input_file", (data as FileQuestion).input_file as File);
	formData.append("question_types", JSON.stringify([data.question_types]));
	formData.append("language", data.language);
	formData.append("difficulty", data.difficulty);
	formData.append("number_of_options", data.number_of_options);

	const accessToken = await getStoredToken();

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/${id}/generate-questions`, {
		method: "POST",
		body: formData,
		headers: {
			Authorization: `Bearer ${accessToken || ""}`,
		},
	});

	const json = await res.json();

	return json;
};
