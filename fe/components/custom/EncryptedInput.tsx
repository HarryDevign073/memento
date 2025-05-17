"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FieldError } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

interface Props {
	htmlFor: string;
	inputId: string;
	label: string;
	placeholder: string;
	error?: FieldError;
	ref?: React.RefObject<HTMLInputElement>;
}

const EncryptedInput = forwardRef<HTMLInputElement, Props>(
	({ htmlFor, inputId, label, placeholder, error, ...props }, ref) => {
		const [isVisible, setIsVisible] = useState<boolean>(false);

		const toggleVisibility = () => setIsVisible((prevState) => !prevState);

		return (
			<div className="space-y-2 min-w-[300px] grid gap-0.5">
				<Label htmlFor={htmlFor}>{label}</Label>
				<div className="relative">
					<Input
						ref={ref}
						id={inputId}
						className={cn(error && "border-red-500", "pe-9")}
						placeholder={placeholder}
						type={isVisible ? "text" : "password"}
						{...props}
					/>
					<button
						className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
						type="button"
						onClick={toggleVisibility}
						aria-label={isVisible ? "Hide password" : "Show password"}
						aria-pressed={isVisible}
						aria-controls="password"
					>
						{isVisible ? (
							<EyeOff size={16} strokeWidth={2} aria-hidden="true" />
						) : (
							<Eye size={16} strokeWidth={2} aria-hidden="true" />
						)}
					</button>
				</div>
			</div>
		);
	}
);

EncryptedInput.displayName = "EncryptedInput";

export default EncryptedInput;
