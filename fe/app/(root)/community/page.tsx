"use client";

import { useState } from "react";
import { parseAsString, useQueryStates } from "nuqs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

import { getListQuizz, likeQuizz, unlikeQuizz } from "@/actions/quizz";

import { QuizzListResponse } from "@/types/quizz";

import EmptyList from "@/components/others/EmptyList";

import CommunityQuizzView from "./components";

import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { QUERY_KEY } from "@/constants/query-key";

import recentView from "@/public/empty/recent-view.png";

export const QUIZZ_SEARCH_PARAMS = {
	search: parseAsString,
};

const Community = () => {
	const queryClient = useQueryClient();
	const [query, setQuery] = useQueryStates(QUIZZ_SEARCH_PARAMS);
	const [tab, setTab] = useState<"grid" | "list">("grid");

	const debouncedQuery = useDebounce(query, 500);

	const { data: quizzResult, isLoading } = useQuery({
		queryKey: [QUERY_KEY.QUIZZ_COMMUNITY_RESULT, debouncedQuery],
		queryFn: async () => {
			const res = getListQuizz({
				search: query.search || undefined || "",
				visibility: "public",
				filter: "all",
			});

			if (!res || "error" in res) {
				return {
					quizzes: [],
					statistics: {
						user_quiz_count: 0,
						user_question_count: 0,
						user_play_count: 0,
						user_like_count: 0,
					},
				};
			}

			return res;
		},
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
	});

	const updateCachedQuiz = (quizId: number, option: "like" | "unlike") => {
		queryClient.setQueryData([QUERY_KEY.QUIZZ_COMMUNITY_RESULT, debouncedQuery], (oldData: QuizzListResponse) => {
			return {
				...oldData,
				quizzes: oldData.quizzes.map((quiz) =>
					quiz.quiz_id === quizId
						? {
								...quiz,
								user_liked: option === "like",
								quiz_like_count: option === "like" ? quiz.quiz_like_count + 1 : quiz.quiz_like_count - 1,
						  }
						: quiz
				),
			};
		});
	};

	const { mutate: likeQuiz } = useMutation({
		mutationFn: async (quizId: number) => {
			await likeQuizz(quizId);
			updateCachedQuiz(quizId, "like");
		},
	});

	const { mutate: unlikeQuiz } = useMutation({
		mutationFn: async (quizId: number) => {
			await unlikeQuizz(quizId);
			updateCachedQuiz(quizId, "unlike");
		},
	});

	const handleInteract = (option: "like" | "unlike", quizId: number) => {
		switch (option) {
			case "like":
				likeQuiz(quizId);
				break;
			case "unlike":
				unlikeQuiz(quizId);
				break;
			default:
				break;
		}
	};

	const renderContent = () => {
		if (!((quizzResult as QuizzListResponse)?.quizzes ?? []).length && !query?.search && !isLoading) {
			return (
				<div className="h-full flex items-center justify-center">
					<EmptyList
						icon={<Image src={recentView} alt="recent-view" width={270} height={200} />}
						title="You haven’t viewed any quizzes yet"
						description="Start exploring quizzes to sharpen your memory and track your progress. Your recently viewed quizzes will show up here."
					/>
				</div>
			);
		}

		return (
			<CommunityQuizzView
				quizzResult={quizzResult as QuizzListResponse}
				tab={tab}
				setTab={setTab}
				query={query}
				setQuery={setQuery}
				isLoading={isLoading}
				handleInteract={handleInteract}
			/>
		);
	};

	return (
		<section
			className={cn(
				"w-full flex flex-col justify-center items-center",
				!((quizzResult as QuizzListResponse)?.quizzes ?? []).length && !query?.search && !isLoading ? "h-full" : ""
			)}
		>
			<div className="w-full flex flex-col justify-between items-center">
				<h1 className="head-text">Welcome to Memento Community</h1>
				<p className="sub-text">Explore thousands of big idea from others users.</p>
			</div>

			{renderContent()}
		</section>
	);
};

export default Community;
