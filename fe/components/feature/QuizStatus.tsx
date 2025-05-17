import { BookText } from "lucide-react";

import { QuizzVisibility } from "@/types/quizz";

import { cn } from "@/lib/utils";

interface CardQuizStatus {
	layout?: "card" | "list";
	status?: QuizzVisibility;
}

const CardQuizStatus: React.FC<CardQuizStatus> = ({ status, layout = "card" }) => {
	return (
		<div
			className={cn(
				"relative rounded-md flex items-center justify-center flex-shrink-0 ",
				layout === "card" ? "w-full h-[120px] " : "w-full md:w-[102px] h-[102px]",
				status === "public" ? "purple-bg-gradient" : "bg-neutral-300"
			)}
		>
			<BookText color="white" />
		</div>
	);
};

export default CardQuizStatus;
