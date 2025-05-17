"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { useToast } from "@/context/toast-context";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ButtonCopyProps {
	className?: string;
	size?: "default" | "sm" | "lg" | "icon" | null | undefined;
	text?: string;
}

const ButtonCopy: React.FC<ButtonCopyProps> = ({ className, size = "sm", text = "Copy" }) => {
	const { setToast } = useToast();

	const [isLoading, setLoading] = useState<boolean>(false);

	const onCopyQuestion = async () => {
		try {
			setLoading(true);
			await navigator.clipboard.writeText(text);
			setToast({
				type: "success",
				message: "Copied to clipboard",
			});
		} catch {
			setToast({
				type: "error",
				message: "Failed to copy content",
			});
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}
	};

	return (
		<Button
			size={size}
			variant={isLoading ? "secondary" : "outline"}
			className={cn(
				"text-sm font-medium text-neutral-700 cursor-pointer transition-all duration-300 ease-in-out",
				className
			)}
			onClick={onCopyQuestion}
		>
			{isLoading ? <Check size={20} /> : <Copy size={20} />}
			Copy
		</Button>
	);
};

export default ButtonCopy;
