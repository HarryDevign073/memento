"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { useToast } from "@/context/toast-context";

import { signUp } from "@/actions/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EncryptedInput from "../custom/EncryptedInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

import { newUserRequest, NewUserRequest } from "@/types/auth";

import { cn } from "@/lib/utils";
import { URLS } from "@/constants/urls";
import { handleHttpResponse } from "@/utils/http";
import { occuptions } from "@/constants";

const DEFAULT_VALUE: NewUserRequest = {
	firstName: "",
	lastName: "",
	username: "",
	password: "",
	confirmPassword: "",
};

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
	const router = useRouter();
	const { setToast } = useToast();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const form = useForm<NewUserRequest>({
		defaultValues: DEFAULT_VALUE,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		control,
		watch,
	} = form;

	const occupation = watch("occupation");

	const onSubmit = async (data: NewUserRequest) => {
		const isValid = validate(data);
		if (!isValid) return;

		try {
			setIsLoading(true);
			const res = await signUp(data);

			handleHttpResponse({
				response: res,
				setToast,
				successState: {
					message: "Register successfully",
				},
				errorState: {
					message: "Register failed",
				},
				callback: () => {
					router.push(URLS.AUTH.SIGN_IN);
				},
			});
		} catch {
			toast.error("Register failed");
		} finally {
			setIsLoading(false);
		}
	};

	const validate = (data: NewUserRequest): boolean => {
		const result = newUserRequest.safeParse(data);
		if (!result.success) {
			result.error.issues.forEach((issue) => {
				setError(issue.path[0] as keyof NewUserRequest, { message: issue.message });
			});
		}
		return result.success;
	};

	return (
		<form className={cn("flex flex-col gap-6", className)} {...props}>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Create your Memento account</h1>
				<p className="text-balance text-sm text-muted-foreground">
					Start learning smarter with AI-generated quizzes made just for you
				</p>
			</div>
			<div className="grid gap-5">
				<div className="flex flex-col md:flex-row items-center justify-center gap-3">
					<div className="grid gap-2 w-full">
						<Label htmlFor="firstname">First Name</Label>
						<Input
							id="firstname"
							className={cn({ "border-red-500": errors.firstName })}
							type="text"
							placeholder="Harry"
							required
							{...register("firstName", { required: true })}
						/>
					</div>
					<div className="grid gap-2 w-full">
						<Label htmlFor="lastname">Last Name</Label>
						<Input
							id="lastname"
							className={cn({ "border-red-500": errors.lastName })}
							type="text"
							placeholder="Devign"
							required
							{...register("lastName", { required: true })}
						/>
					</div>
				</div>

				<div className="flex items-center justify-center gap-3">
					<div className="grid gap-2 w-full">
						<Controller
							name="occupation"
							control={control}
							render={({ field }) => (
								<>
									<Label htmlFor="occupations">Occupations</Label>
									<Select value={occupation || ""} onValueChange={field.onChange}>
										<SelectTrigger className={cn({ "border-red-500": errors.occupation, "w-full": true })}>
											<SelectValue placeholder="Select your job" />
										</SelectTrigger>
										<SelectContent>
											{occuptions.map((occupation) => (
												<SelectItem key={occupation.value} value={occupation.value}>
													{occupation.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</>
							)}
						/>
					</div>
				</div>

				{/* Username */}
				<div className="grid gap-2">
					<Label htmlFor="username">Username</Label>
					<Input
						id="username"
						className={cn({ "border-red-500": errors.username })}
						type="text"
						placeholder="Harry Devign"
						required
						{...register("username", { required: true })}
					/>
				</div>

				{/* Create password group */}
				<EncryptedInput
					inputId="password"
					label="Create your password"
					placeholder="Input your password"
					htmlFor="password"
					error={errors.password}
					{...register("password", { required: true })}
				/>
				<EncryptedInput
					inputId="password"
					label="Confirm your password"
					placeholder="Input your password"
					htmlFor="password"
					error={errors.confirmPassword}
					{...register("confirmPassword", { required: true })}
				/>

				<Button type="submit" className="w-full" disabled={isLoading} onClick={handleSubmit(onSubmit)}>
					{isLoading && <Loader2 className="animate-spin" size={16} />}
					Start Learning
				</Button>
			</div>
			<div className="text-center text-sm">
				Already have an account?{" "}
				<a
					href="/"
					className={cn({ "pointer-events-none": isLoading, "underline underline-offset-4": true })}
					onClick={(e) => {
						if (isLoading) {
							e.preventDefault();
						}
					}}
				>
					Sign in
				</a>
			</div>
		</form>
	);
}
