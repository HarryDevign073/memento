"use client";

import { useState } from "react";
import { parseAsString, useQueryStates } from "nuqs";
import { LayoutGrid, List, Loader2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getListQuizz, likeQuizz, unlikeQuizz } from "@/actions/quizz";

import { QuizzListResponse } from "@/types/quizz";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Search from "@/components/ui/search";
import ListQuizItem from "@/components/feature/ListQuizItem";
import CardQuizItem from "@/components/feature/CardQuizItem";

import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

import { QUERY_KEY } from "@/constants/query-key";

export const QUIZZ_SEARCH_PARAMS = {
	search: parseAsString,
};

const tabs: ("grid" | "list")[] = ["grid", "list"];

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

	return (
		<section className="w-full flex flex-col justify-center items-center">
			<div className="w-full flex flex-col justify-between items-center">
				<h1 className="head-text">Welcome to Memento Community</h1>
				<p className="sub-text">Explore thousands of big idea from others users.</p>
			</div>

			<Tabs
				defaultValue="grid"
				className="w-full mt-9"
				value={tab}
				onValueChange={(value) => setTab(value as "grid" | "list")}
			>
				<div className="flex lg:flex-row flex-col-reverse items-start gap-3 justify-between lg:items-center w-full">
					<div className="flex w-full justify-start items-center gap-2">
						<Search
							placeholder="Search by quiz name"
							value={query?.search || ""}
							onChange={(e) => setQuery({ search: e.target.value })}
						/>
					</div>
					<TabsList>
						{tabs.map((tab) => (
							<TabsTrigger key={tab} value={tab} className="h-10">
								{tab === "grid" ? <LayoutGrid /> : <List />}
							</TabsTrigger>
						))}
					</TabsList>
				</div>

				{tabs.map((tab) => (
					<TabsContent key={tab} value={tab} onChangeCapture={() => setTab(tab)}>
						{isLoading ? (
							<div className="h-96 w-full flex items-center justify-center">
								<div className="animate-spin">
									<Loader2 size={24} className="text-violet-500 " />
								</div>
							</div>
						) : (
							<div
								className={cn(
									tab === "list"
										? "flex flex-col mt-3 gap-3 "
										: "mt-3 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3 w-full"
								)}
							>
								{((quizzResult as QuizzListResponse).quizzes ?? []).map((item) => {
									const Component = tab === "grid" ? CardQuizItem : ListQuizItem;
									console.log({
										quizName: item.name,
										quizId: item.quiz_id,
										userLiked: item.user_liked,
									});
									return (
										<Component
											key={item.quiz_id}
											quizId={item.quiz_id}
											quizTitle={item.name}
											quizDesc={item.description}
											questionCount={item.quiz_questions_count}
											likeCount={item.quiz_like_count}
											playCount={item.quiz_play_count}
											authorName={item.user_first_name}
											authorNameAbbre={item.user_last_name}
											occupation={item.status}
											editable={false}
											layout={tab === "grid" ? "card" : "list"}
											status={item.visibility}
											isLiked={item.user_liked}
											onInteract={(option) => handleInteract(option, item.quiz_id)}
										/>
									);
								})}
							</div>
						)}
					</TabsContent>
				))}
			</Tabs>
		</section>
	);
};

export default Community;
