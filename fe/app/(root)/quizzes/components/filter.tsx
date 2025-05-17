import { useState } from "react";
import { FolderPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Search from "@/components/ui/search";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpsertQuizzDialog from "@/components/feature/Dialog/CreateQuizDialog";

import { QuizzQuery } from "@/types/quizz";

interface QuizzFilterProps {
	query: QuizzQuery;
	setQuery: (query: QuizzQuery) => void;
}

const QuizzFilter: React.FC<QuizzFilterProps> = ({ query, setQuery }) => {
	const [upsertQuizDialog, setUpsertQuizDialog] = useState<boolean>(false);

	return (
		<div className="flex lg:flex-row flex-col-reverse items-start gap-3 justify-between lg:items-center w-full">
			<TabsList>
				<TabsTrigger value="all">All</TabsTrigger>
				<TabsTrigger value="public">Public</TabsTrigger>
				<TabsTrigger value="private">Private</TabsTrigger>
			</TabsList>
			<div className="flex w-full lg:justify-end items-center gap-2">
				<Search
					placeholder="Search by quiz name"
					value={query.search}
					onChange={(e) => setQuery({ ...query, search: e.target.value })}
				/>

				<Button size={"lg"} onClick={() => setUpsertQuizDialog(true)}>
					<span className="hidden lg:inline-block">
						<FolderPlus />
					</span>
					New Quiz
				</Button>

				<Dialog open={upsertQuizDialog} onOpenChange={setUpsertQuizDialog}>
					<DialogContent
						className="sm:max-w-[60%]"
						onInteractOutside={(e) => {
							e.preventDefault();
						}}
						onClick={(e) => {
							e.stopPropagation();
						}}
					>
						<UpsertQuizzDialog onCloseDialog={() => setUpsertQuizDialog(false)} />
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};
export default QuizzFilter;
