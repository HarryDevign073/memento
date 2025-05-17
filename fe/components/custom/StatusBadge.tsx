import React from "react";

import { QuizzVisibility } from "@/types/quizz";

import { cn } from "@/lib/utils";

interface StatusBadgeProps {
	status: QuizzVisibility;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
	return (
		<div className="inline-flex items-center rounded-sm border bg-white border-neutral-200 h-5 px-1.5 text-xs font-medium transition-colors  gap-2">
			<div className={cn("h-2 w-2 rounded-full", status === "public" ? "bg-green-500" : "bg-red-500")}></div>
			<div className=" text-neutral-900">{status === "public" ? "Public" : "Private"}</div>
		</div>
	);
};

export default StatusBadge;
