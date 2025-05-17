import React, { ReactElement, useEffect } from "react";
import { X } from "lucide-react";

import SuccessMessageIcon from "@/components/icons/success-status";
import ErrorMessageIcon from "@/components/icons/error-status";
import WarningMessageIcon from "@/components/icons/warning-status";

import { cn } from "@/lib/utils";

export type ToastMessageType = "warning" | "error" | "success" | "";

export interface ToastProps {
	className?: string;
	type?: ToastMessageType;

	title?: string;
	message: string;

	onClose?: () => void;

	closeAfter?: number;
}

const Toast: React.FC<ToastProps> = ({
	className = "",
	type = "",
	message = "",
	title = "",
	closeAfter = 3000,
	onClose,
}) => {
	useEffect(() => {
		if (onClose) {
			setTimeout(() => {
				onClose();
			}, closeAfter);
		}
	}, [open]);

	const typeIcon = (type: string): ReactElement => {
		switch (type) {
			case "warning":
				return <WarningMessageIcon />;
			case "error":
				return <ErrorMessageIcon />;
			case "success":
				return <SuccessMessageIcon />;
			default:
				return (
					<svg className="w-4 h-4 shrink-0 fill-current opacity-80 mt-[3px] mr-3" viewBox="0 0 16 16">
						<path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
					</svg>
				);
		}
	};

	const getMessageTitle = () => {
		switch (type) {
			case "error":
				return "Something went wrong";
			case "success":
				return "Successfully";
			case "warning":
				return "Warning";
			default:
				return "Info";
		}
	};

	return (
		<div
			className={cn(
				className,
				"fixed top-6 left-1/2 -translate-x-1/2 z-[9999] px-4 py-2 rounded-xl bg-white border border-neutral-200 shadow-xl"
			)}
			role="alert"
		>
			<div className={`inline-flex min-w-[20rem] max-w-[37rem]`}>
				<div className="flex w-full justify-between items-start">
					<div className="flex items-center gap-4">
						<div className="scale-75 w-fit">{typeIcon(type)}</div>
						<div>
							<span className="block text-sm md:text-md font-semibold text-neutral-600">
								{title || getMessageTitle()}
							</span>
							<span className="text-xs font-normal text-neutral-500">{message}</span>
						</div>
					</div>
					<button
						className="opacity-70 text-neutral-500 hover:opacity-80 ml-3 mt-[3px]"
						onClick={() => onClose && onClose()}
						title="Close"
					>
						<div className="sr-only">Close</div>
						<X width={12} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Toast;
