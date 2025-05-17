import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface CheckAnswerBadgeProps {
	isCorrect?: boolean;
	correctAnswer?: any;
}

const CheckAnswerBadge: React.FC<CheckAnswerBadgeProps> = ({ isCorrect, correctAnswer }) => {
	return (
		<div className="flex items-center gap-4">
			<div
				className={cn(
					"w-10 h-10 rounded-md border flex items-center justify-center text-white",
					isCorrect ? "bg-[#079455]" : "bg-[#D92D20]"
				)}
			>
				{isCorrect ? <Check size={20} /> : <X size={20} />}
			</div>
			<span className={cn("text-sm font-semibold", isCorrect ? "text-[#079455]" : "text-[#D92D20]")}>
				{isCorrect ? "Correct!!" : "Incorrect!!"}
			</span>
		</div>
	);
};

export default CheckAnswerBadge;
