"use client";

import { useQuery } from "@tanstack/react-query";
import { parseAsString, useQueryStates } from "nuqs";

import { getListQuizz } from "@/actions/quizz";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import QuizItem from "@/components/feature/ListQuizItem";
import MetricBox from "@/components/feature/Metric";

import QuizzFilter from "./components/filter";

import { metricItem, myItem } from "@/constants";

import useDebounce from "@/hooks/useDebounce";
import { useMemo, useState } from "react";
import { httpResponse, HttpResponse } from "@/types/http";
import { QuizzListResponse } from "@/types/quizz";

export const QUIZZ_SEARCH_PARAMS = {
	search: parseAsString,
	sort: parseAsString,
	filter: parseAsString,
};

const tabs: ("all" | "public" | "private")[] = ["all", "public", "private"];

function Quizzes() {
	const [query, setQuery] = useQueryStates(QUIZZ_SEARCH_PARAMS);
	const [tab, setTab] = useState<"all" | "public" | "private">("all");

	const debouncedQuery = useDebounce(query, 500);

	const { data: quizzList, isLoading } = useQuery({
		queryKey: ["quizzList", debouncedQuery],
		queryFn: () =>
			getListQuizz({
				search: query.search || undefined || "",
				sort: (query.sort as "desc" | "asc") || "desc",
				filter: (query.filter as "all" | "favorites") || "all",
			}),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
	});
	const dataSrc = useMemo(() => {
		if (!quizzList || "error" in quizzList) {
			return [];
		}

		if (tab === "all") {
			return (quizzList as QuizzListResponse[]) || [];
		}

		return ((quizzList as QuizzListResponse[]) || []).filter((item) => item.visibility === tab);
	}, [quizzList, tab]);

	return (
		<>
			<h1 className="head-text">Your quizzes</h1>
			<p className="sub-text">Separate your questions into suitable categories</p>

			<section className="mt-9 flex flex-col gap-5 h-screen">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
					{metricItem.map((metric) => (
						<MetricBox key={metric.title} iconURL={metric.iconURL} title={metric.title} value={metric.value} />
					))}
				</div>
				<Tabs
					defaultValue="all"
					className="w-full"
					value={tab}
					onValueChange={(value) => setTab(value as "all" | "public" | "private")}
				>
					<QuizzFilter />

					{tabs.map((tab) => (
						<TabsContent
							key={tab}
							value={tab}
							onChangeCapture={() => {
								console.info("tab: ", tab);
								setTab(tab);
							}}
						>
							<div className="flex flex-col mt-3 gap-3 ">
								{dataSrc.map((item) => (
									<QuizItem
										key={item.quiz_id}
										quizId={item.quiz_id}
										quizTitle={item.name}
										quizDesc={item.description}
										questionCount={item.quiz_questions_count}
										likeCount={item.quiz_like_count}
										playCount={item.quiz_play_count}
										isActive={false}
										authorName={item.user_first_name} /// TODO: get author name
										authorNameAbbre={item.user_last_name} /// TODO: get author name
										authorQuizCount={item.quiz_play_count} /// TODO: get author quiz count
										authorLikeCount={item.quiz_like_count} /// TODO: get author like count
										occupation={item.status}
										state={item.status}
									/>
								))}
							</div>
						</TabsContent>
					))}
				</Tabs>
			</section>
		</>
	);
}

export default Quizzes;