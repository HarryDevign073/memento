import { FolderPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Search from "@/components/ui/search";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

import { QuizzQuery } from "@/types/quizz";

interface QuizzFilterProps {
	query: QuizzQuery;
	setQuery: (query: QuizzQuery) => void;

	upsertQuizDialog: boolean;
	setUpsertQuizDialog: (value: boolean) => void;

	disabled?: boolean;
}

const QuizzFilter: React.FC<QuizzFilterProps> = ({
	query,
	setQuery,
	upsertQuizDialog,
	setUpsertQuizDialog,
	disabled,
}) => {
	return (
		<div className="flex lg:flex-row flex-col-reverse items-start gap-3 justify-between lg:items-center w-full">
			<TabsList>
				<TabsTrigger value="all" disabled={disabled}>
					All
				</TabsTrigger>
				<TabsTrigger value="public" disabled={disabled}>
					Public
				</TabsTrigger>
				<TabsTrigger value="private" disabled={disabled}>
					Private
				</TabsTrigger>
			</TabsList>
			<div className="flex w-full lg:justify-end items-center gap-2">
				<Search
					placeholder="Search by quiz name"
					value={query.search}
					onChange={(e) => setQuery({ ...query, search: e.target.value })}
					disabled={disabled}
				/>

				<Button size={"lg"} onClick={() => setUpsertQuizDialog(true)} disabled={disabled}>
					<span className="hidden lg:inline-block">
						<FolderPlus />
					</span>
					New Quiz
				</Button>
			</div>
		</div>
	);
};
export default QuizzFilter;