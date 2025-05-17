import { FolderPlus } from "lucide-react";

import CreateCollectionDialog from "@/components/feature/Dialog/CreateQuizDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Search from "@/components/ui/search";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

import { QuizzQuery } from "@/types/quizz";

interface QuizzFilterProps {
	query: QuizzQuery;
	setQuery: (query: QuizzQuery) => void;
}

const QuizzFilter: React.FC<QuizzFilterProps> = ({ query, setQuery }) => {
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

				<Dialog>
					<DialogTrigger asChild>
						<Button size={"lg"}>
							<span className="hidden lg:inline-block">
								<FolderPlus />
							</span>
							New Quiz
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[60%]">
						<CreateCollectionDialog />
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};
export default QuizzFilter;
