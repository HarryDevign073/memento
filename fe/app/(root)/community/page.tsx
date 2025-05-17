"use client";

import { useState } from "react";
import { parseAsString, useQueryStates } from "nuqs";
import { LayoutGrid, List, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { getListQuizz } from "@/actions/quizz";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Search from "@/components/ui/search";
import ListQuizItem from "@/components/feature/ListQuizItem";
import CardQuizItem from "@/components/feature/CardQuizItem";

import { QuizzListResponse } from "@/types/quizz";
import { HttpResponse } from "@/types/http";

import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

export const QUIZZ_SEARCH_PARAMS = {
	search: parseAsString,
};

const tabs: ("grid" | "list")[] = ["grid", "list"];

const Community = () => {
	const [query, setQuery] = useQueryStates(QUIZZ_SEARCH_PARAMS);
	const [tab, setTab] = useState<"grid" | "list">("grid");

	const debouncedQuery = useDebounce(query, 500);

	const { data: quizzList, isLoading } = useQuery({
		queryKey: ["quizzList", debouncedQuery],
		queryFn: async () => {
			const res = await getListQuizz({
				search: query.search || undefined || "",
				sort: "desc",
				filter: "all",
			});

			if ((res as HttpResponse)?.error) return [];

			return (res as QuizzListResponse[]).filter((q) => q.visibility === "public");
		},
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
	});

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
								{(quizzList ?? []).map((item) => {
									const Component = tab === "grid" ? CardQuizItem : ListQuizItem;

									return (
										<Component
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
											editable={false}
											layout={tab === "grid" ? "card" : "list"}
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
