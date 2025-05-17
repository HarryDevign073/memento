import { BookText } from "lucide-react";

import { cn } from "@/lib/utils";

interface CardQuizStatus {
	isActive: boolean;
	editable?: boolean;
	layout?: "card" | "list";
}

const CardQuizStatus: React.FC<CardQuizStatus> = ({ isActive, editable, layout = "card" }) => {
	return (
		<div
			className={cn(
				"relative rounded-md flex items-center justify-center flex-shrink-0 ",
				layout === "card" ? "w-full h-[120px] " : "w-full md:w-[102px] h-[102px]",
				isActive ? "purple-bg-gradient" : "bg-neutral-300"
			)}
		>
			<BookText color="white" />

			{/* {!editable && (
				<div className="absolute bottom-2 left-2">
					<StatusBadge status={isActive} />
				</div>
			)} */}
		</div>
	);
};

export default CardQuizStatus;
