"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

import { useToast } from "@/context/toast-context";
import { useUser } from "@/context/user-context";

import { signIn } from "@/actions/auth";
import { getUserById } from "@/actions/user";

import { authRequest, AuthRequest, AuthResponse } from "@/types/auth";
import { UserProfile } from "@/types/user";
import { HttpResponse } from "@/types/http";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import EncryptedInput from "./custom/EncryptedInput";

import { cn } from "@/lib/utils";
import { handleHttpResponse } from "@/utils/http";

const DEFAULT_VALUE: AuthRequest = {
	username: "",
	password: "",
};

export function SignInForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
	const router = useRouter();
	const { setToast } = useToast();
	const { setCurrentUser } = useUser();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const form = useForm<AuthRequest>({
		defaultValues: DEFAULT_VALUE,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = form;

	const onSubmit = async (data: AuthRequest) => {
		const isValid = validate(data);
		if (!isValid) return;

		try {
			setIsLoading(true);
			const res = await signIn(data);

			handleHttpResponse({
				response: res,
				setToast,
				successState: {
					message: "Login successful",
				},
				errorState: {
					message: "Login failed",
				},
				callback: async () => {
					const decodedToken = jwtDecode((res as AuthResponse).token);

					const userId = (decodedToken as any)?._id;

					if (userId) {
						const res = await getUserById(userId);

						if (!(res as HttpResponse)?.error) {
							setCurrentUser(res as UserProfile);
						}
					}

					router.push("/");
				},
			});
		} catch {
			setToast({
				type: "error",
				message: "Login failed",
				title: "Login failed",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const validate = (data: AuthRequest): boolean => {
		const result = authRequest.safeParse(data);
		if (!result.success) {
			result.error.issues.forEach((issue) => {
				setError(issue.path[0] as keyof AuthRequest, { message: issue.message });
			});
		}
		return result.success;
	};

	return (
		<form className={cn("flex flex-col gap-6", className)} {...props}>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Sign in to Memento</h1>
				<p className="text-balance text-sm text-muted-foreground">Learn smarter with quizzes generated just for you</p>
			</div>
			<div className="grid gap-6">
				<div className="grid gap-2">
					<Label htmlFor="username">Username</Label>
					<Input
						id="username"
						className={cn(errors.username && "border-red-500")}
						type="text"
						placeholder="Harry Devign"
						required
						{...register("username", { required: true })}
					/>
				</div>

				<EncryptedInput
					inputId="password"
					label="Confirm your password"
					placeholder="Input your password"
					htmlFor="password"
					error={errors.password}
					{...register("password", { required: true })}
				/>

				<Button
					type="submit"
					className="w-full flex items-center gap-2"
					onClick={handleSubmit(onSubmit)}
					disabled={isLoading}
				>
					{isLoading && <Loader2 className="animate-spin" size={16} />}
					Login
				</Button>
			</div>
			<div className="text-center text-sm">
				Don&apos;t have an account?{" "}
				<a href="/sign-up" className="underline underline-offset-4">
					Sign up
				</a>
			</div>
		</form>
	);
}
