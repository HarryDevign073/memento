import { QueryClient } from "@tanstack/react-query";

import { QUERY_KEY } from "@/constants/query-key";

export const refetchQuizz = async (queryClient: QueryClient) => {
	await Promise.all([
		queryClient.refetchQueries({ queryKey: [QUERY_KEY.USER_QUIZZ_LIST] }),
		queryClient.refetchQueries({ queryKey: [QUERY_KEY.QUIZZ_LIST] }),
		queryClient.refetchQueries({ queryKey: [QUERY_KEY.QUIZZ_COMMUNITY_RESULT] }),
	]);
};
