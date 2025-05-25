import { Loader2 } from "lucide-react";

import { QuizzListResponse, QuizzQuery } from "@/types/quizz";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import ListQuizItem from "@/components/feature/ListQuizItem";

import QuizzFilter from "./filter";

interface QuizzViewProps {
	quizzResult: QuizzListResponse;

	tab: "all" | "public" | "private";
	setTab: (value: "all" | "public" | "private") => void;

	query: QuizzQuery;
	setQuery: (value: QuizzQuery) => void;

	isLoading: boolean;

	upsertQuizDialog: boolean;
	setUpsertQuizDialog: (val: boolean) => void;

	handleInteract: (option: "like" | "unlike", quizId: number) => void;
}

const tabs: ("all" | "public" | "private")[] = ["all", "public", "private"];

const QuizzView: React.FC<QuizzViewProps> = ({
	quizzResult,
	tab,
	setTab,
	query,
	setQuery,
	isLoading,
	upsertQuizDialog,
	setUpsertQuizDialog,
	handleInteract,
}) => {
	return (
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
				upsertQuizDialog={upsertQuizDialog}
				setUpsertQuizDialog={setUpsertQuizDialog}
				disabled={isLoading}
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
				</TabsContent>
			))}
		</Tabs>
	);
};

export default QuizzView;
