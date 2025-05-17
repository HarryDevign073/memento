import React from "react";

import AnimatedLoading from "../../custom/AnimatedLoading";
import ProcessingProgressBar from "../ProcessingProgressBar";

import { cn } from "@/lib/utils";

interface ProcessingDialogProps {
	className?: string;
}

const ProcessingDialog: React.FC<ProcessingDialogProps> = ({ className }) => {
	return (
		<div className={cn("w-fit flex flex-col items-center justify-center gap-3 bg-white p-6 rounded-2xl", className)}>
			<AnimatedLoading />
			<div className="flex flex-col gap-1.5">
				<div className="section-title !text-xl text-center">Generating questions</div>
				<p className="text-neutral-600 text-md font-normal leading-5 text-center max-w-[420px]">
					Please wait while we generate the questions for you, this will take a couple of seconds
				</p>
			</div>
			<ProcessingProgressBar />
		</div>
	);
};

export default ProcessingDialog;
