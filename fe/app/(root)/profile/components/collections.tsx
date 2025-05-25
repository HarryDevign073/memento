"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getListQuizz, likeQuizz, unlikeQuizz } from "@/actions/quizz";

import { QuizzListResponse } from "@/types/quizz";

import ListQuizItem from "@/components/feature/ListQuizItem";

import CollectionsPagination from "./pagination";

import { QUERY_KEY } from "@/constants/query-key";

const ITEMS_PER_PAGE = 2;
const DEFAULT_PAGE = 1;

const Collections = () => {
	const queryClient = useQueryClient();
	const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);

	const { data: quizzResult, isLoading } = useQuery({
		queryKey: [QUERY_KEY.USER_QUIZZ_LIST],
		queryFn: () => {
			const res = getListQuizz({
				filter: "all",
				checkedUser: true,
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
		queryClient.setQueryData([QUERY_KEY.USER_QUIZZ_LIST], (oldData: QuizzListResponse) => {
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

	return (
		<div className="w-full">
			<h1 className="text-2xl font-semibold text-neutral-800">My quizzes</h1>
			{isLoading ? (
				<div className="h-96 w-full flex items-center justify-center">
					<div className="animate-spin">
						<Loader2 size={24} className="text-violet-500 " />
					</div>
				</div>
			) : (
				<div className="flex flex-col mt-3 gap-3">
					{((quizzResult as QuizzListResponse)?.quizzes ?? [])
						.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
						.map((item) => (
							<ListQuizItem
								key={item.quiz_id}
								quizId={item.quiz_id}
								quizTitle={item.name}
								quizDesc={item.description}
								questionCount={item.quiz_questions_count}
								likeCount={item.quiz_like_count}
								playCount={item.quiz_play_count}
								authorName={item.user_first_name}
								authorNameAbbre={item.user_last_name}
								occupation={item.user_occupation || ""}
								editable={true}
								layout="list"
								status={item.visibility}
								isLiked={item.user_liked}
								onInteract={(option) => handleInteract(option, item.quiz_id)}
							/>
						))}
				</div>
			)}

			<div className="mt-3">
				<CollectionsPagination
					totalPages={Math.ceil(((quizzResult as QuizzListResponse)?.quizzes ?? []).length / ITEMS_PER_PAGE)}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
				/>
			</div>
		</div>
	);
};

export default Collections;
