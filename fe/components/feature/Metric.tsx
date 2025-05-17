"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface MetricBoxProps {
	iconURL: string;
	title: string;
	value?: number;
}

const MetricBox: React.FC<MetricBoxProps> = ({ iconURL, title, value }) => {
	return (
		<section className="section w-full flex gap-6">
			<div className="hidden h-12 w-12 md:flex items-center justify-center rounded-md border border-neutral-200">
				<img src={iconURL} alt="metric_Icon" />
			</div>
			<div className={cn("flex flex-col items-start", value && "self-stretch")}>
				<div className="self-stretch text-neutral-600 text-sm font-medium leading-5">{title}</div>
				{value == undefined ? (
					<div className="animate-spin mt-1.5">
						<Loader2 size={20} className="text-primary-400" />
					</div>
				) : (
					<div className="self-stretch text-neutral-900 text-2xl font-medium leading-8">{value}</div>
				)}
			</div>
		</section>
	);
};

export default MetricBox;
