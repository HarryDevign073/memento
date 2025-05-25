"use client";

import { useState } from "react";
import { LayoutGrid, List, Loader2 } from "lucide-react";
import { ParserBuilder, Values } from "nuqs";

import { QuizzListResponse } from "@/types/quizz";

import CardQuizItem from "@/components/feature/CardQuizItem";
import ListQuizItem from "@/components/feature/ListQuizItem";
import Search from "@/components/ui/search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FilterQuizzTab from "./filter-tab";

import { cn } from "@/lib/utils";

interface CommunityQuizzViewProps {
	quizzResult: QuizzListResponse;

	tab: "grid" | "list";
	setTab: (val: "grid" | "list") => void;

	query: Values<{
		search: ParserBuilder<string>;
	}>;
	setQuery: (
		val: Values<{
			search: ParserBuilder<string>;
		}>
	) => void;

	isLoading: boolean;

	handleInteract: (option: "like" | "unlike", quizId: number) => void;
}

const tabs: ("grid" | "list")[] = ["grid", "list"];

const CommunityQuizzView: React.FC<CommunityQuizzViewProps> = ({
	quizzResult,
	tab,
	setTab,
	query,
	setQuery,
	isLoading,
	handleInteract,
}) => {
	const [selectedQuizType, setSelectedQuizType] = useState<"all" | "favorite">("all");

	return (
		<Tabs
			defaultValue="grid"
			className="w-full mt-9"
			value={tab}
			onValueChange={(value) => setTab(value as "grid" | "list")}
		>
			<div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-3">
				<FilterQuizzTab
					selectedQuizType={selectedQuizType}
					setSelectedQuizType={setSelectedQuizType}
					isLoading={isLoading}
				/>

				<div className="flex justify-start md:justify-end gap-2 w-full">
					<div className="flex justify-start items-center gap-2">
						<Search
							placeholder="Search by quiz name"
							value={query?.search || ""}
							onChange={(e) => setQuery({ search: e.target.value })}
							disabled={isLoading}
						/>
					</div>
					<TabsList>
						{tabs.map((tab) => (
							<TabsTrigger key={tab} value={tab} className="h-10" disabled={isLoading}>
								{tab === "grid" ? <LayoutGrid /> : <List />}
							</TabsTrigger>
						))}
					</TabsList>
				</div>
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
							{((quizzResult as QuizzListResponse).quizzes ?? [])
								.filter((item) => {
									if (selectedQuizType === "all") return true;
									return item.user_liked;
								})
								.map((item) => {
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
											authorName={item.user_first_name}
											authorNameAbbre={item.user_last_name}
											occupation={item.user_occupation || ""}
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
	);
};

export default CommunityQuizzView;
