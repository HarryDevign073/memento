"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { Loader2 } from "lucide-react";

import { getListQuizz } from "@/actions/quizz";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import ListQuizItem from "@/components/feature/ListQuizItem";
import MetricBox from "@/components/feature/Metric";

import QuizzFilter from "./filter";

import useDebounce from "@/hooks/useDebounce";
import { QuizzListResponse } from "@/types/quizz";

export const QUIZZ_SEARCH_PARAMS = {
	search: parseAsString,
	sort: parseAsString,
	filter: parseAsString,
	checkedUser: parseAsBoolean,
};

const tabs: ("all" | "public" | "private")[] = ["all", "public", "private"];
const metricBoxs = ["user_quiz_count", "user_question_count", "user_play_count", "user_like_count"];

const Quizzes = () => {
	const [query, setQuery] = useQueryStates(QUIZZ_SEARCH_PARAMS);
	const [tab, setTab] = useState<"all" | "public" | "private">("all");

	const debouncedQuery = useDebounce(query, 500);

	const { data: quizzResult, isLoading } = useQuery({
		queryKey: ["quizzList", debouncedQuery, tab],
		queryFn: () => {
			const res = getListQuizz({
				search: query.search || undefined || "",
				sort: (query.sort as "desc" | "asc") || "desc",
				filter: (query.filter as "all" | "favorites") || "all",
				checkedUser: query.checkedUser || true,
				...(tab === "all" ? {} : { visibility: tab }),
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

	const getMetricIconURL = (key: string): string => {
		switch (key) {
			case "user_quiz_count":
				return "/assets/quiz.svg";
			case "user_question_count":
				return "/assets/file-question.svg";
			case "user_play_count":
				return "/assets/play.svg";
			default:
				return "/assets/heart.svg";
		}
	};

	const getMetricTitle = (key: string): string => {
		switch (key) {
			case "user_quiz_count":
				return "Total Quizzes";
			case "user_question_count":
				return "Total Questions";
			case "user_play_count":
				return "Total Plays";
			default:
				return "Total Liked";
		}
	};

	return (
		<>
			<header className="sticky">
				<h1 className="head-text">Your quizzes</h1>
				<p className="sub-text">Separate your questions into suitable categories</p>
			</header>

			<section className="mt-9 flex flex-col gap-5 h-screen">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
					{metricBoxs.map((key) => (
						<MetricBox
							key={key}
							iconURL={getMetricIconURL(key)}
							title={getMetricTitle(key)}
							value={(quizzResult as QuizzListResponse)?.statistics?.[key as keyof QuizzListResponse["statistics"]]}
						/>
					))}
				</div>

				<Tabs
					defaultValue="all"
					className="w-full"
					value={tab}
					onValueChange={(value) => setTab(value as "all" | "public" | "private")}
				>
					<QuizzFilter
						query={{
							search: query.search || undefined,
							sort: query.sort as "desc" | "asc" | undefined,
							filter: query.filter as "all" | "favorites" | undefined,
						}}
						setQuery={setQuery}
					/>

					{tabs.map((tab) => (
						<TabsContent key={tab} value={tab} onChangeCapture={() => setTab(tab)}>
							{isLoading ? (
								<div className="h-96 w-full flex items-center justify-center">
									<div className="animate-spin">
										<Loader2 size={24} className="text-violet-500 " />
									</div>
								</div>
							) : (
								<div className="flex flex-col mt-3 gap-3 ">
									{((quizzResult as QuizzListResponse)?.quizzes ?? []).map((item) => (
										<ListQuizItem
											key={item.quiz_id}
											quizId={item.quiz_id}
											quizTitle={item.name}
											quizDesc={item.description}
											questionCount={item.quiz_questions_count}
											likeCount={item.quiz_like_count}
											playCount={item.quiz_play_count}
											authorName={item.user_first_name} /// TODO: get author name
											authorNameAbbre={item.user_last_name} /// TODO: get author name
											// authorQuizCount={item.quiz_play_count} /// TODO: get author quiz count
											// authorLikeCount={item.quiz_like_count} /// TODO: get author like count
											occupation={item.status}
											editable={true}
											layout="list"
											status={item.visibility}
										/>
									))}
								</div>
							)}
						</TabsContent>
					))}
				</Tabs>
			</section>
		</>
	);
};

export default Quizzes;
