"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { parseAsString, useQueryStates } from "nuqs";
import { Loader2 } from "lucide-react";

import { getListQuizz } from "@/actions/quizz";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import ListQuizItem from "@/components/feature/ListQuizItem";

import QuizzFilter from "./filter";

import { QuizzListResponse } from "@/types/quizz";

import useDebounce from "@/hooks/useDebounce";

export const QUIZZ_SEARCH_PARAMS = {
	search: parseAsString,
	sort: parseAsString,
	filter: parseAsString,
};

const tabs: ("all" | "public" | "private")[] = ["all", "public", "private"];

const Quizzes = () => {
	const [query, setQuery] = useQueryStates(QUIZZ_SEARCH_PARAMS);
	const [tab, setTab] = useState<"all" | "public" | "private">("all");

	const [dataSrc, setDataSrc] = useState<QuizzListResponse[]>([]);

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

	useEffect(() => {
		if (!quizzList || "error" in quizzList) return;

		let fiteredQuizzes = [...(quizzList as QuizzListResponse[])];

		if (tab === "public") {
			fiteredQuizzes = fiteredQuizzes.filter((item) => item.visibility === "public");
		} else if (tab === "private") {
			fiteredQuizzes = fiteredQuizzes.filter((item) => item.visibility === "private");
		}

		setDataSrc(fiteredQuizzes);
	}, [quizzList, tab]);

	return (
		<>
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
								{dataSrc.map((item) => (
									<ListQuizItem
										key={item.quiz_id}
										quizId={item.quiz_id}
										quizTitle={item.name}
										quizDesc={item.description}
										questionCount={item.quiz_questions_count}
										likeCount={item.quiz_like_count}
										playCount={item.quiz_play_count}
										isActive={true}
										authorName={item.user_first_name} /// TODO: get author name
										authorNameAbbre={item.user_last_name} /// TODO: get author name
										authorQuizCount={item.quiz_play_count} /// TODO: get author quiz count
										authorLikeCount={item.quiz_like_count} /// TODO: get author like count
										occupation={item.status}
										editable={true}
										layout="list"
									/>
								))}
							</div>
						)}
					</TabsContent>
				))}
			</Tabs>
		</>
	);
};

export default Quizzes;
