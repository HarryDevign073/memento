import { cn } from "@/lib/utils";

interface FilterQuizzTabProps {
	selectedQuizType: "all" | "favorite";
	setSelectedQuizType: (type: "all" | "favorite") => void;
	isLoading: boolean;
}

const quizzTypes: ("all" | "favorite")[] = ["all", "favorite"];

const FilterQuizzTab: React.FC<FilterQuizzTabProps> = ({ selectedQuizType, setSelectedQuizType, isLoading }) => {
	return (
		<div className="bg-muted text-muted-foreground inline-flex h-12 w-fit items-center justify-center rounded-lg p-1">
			{quizzTypes.map((type) => (
				<button
					key={type}
					className={cn(
						"capitalize focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex items-center justify-center gap-1.5 rounded-md px-4 py-2 text-md font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:cursor-not-allowed cursor-pointer disabled:opacity-50 capitalize",
						selectedQuizType === type && "bg-background text-foreground shadow-sm"
					)}
					onClick={() => setSelectedQuizType(type)}
					disabled={isLoading}
				>
					{type}
				</button>
			))}
		</div>
	);
};

export default FilterQuizzTab;
