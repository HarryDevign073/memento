"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useToast } from "@/context/toast-context";

import { createQuizz } from "@/actions/quizz";

import { DialogClose, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { createQuizzRequest, CreateQuizzRequest, CreateQuizzResponse } from "@/types/quizz";

import { cn } from "@/lib/utils";
import { handleHttpResponse } from "@/utils/http";
import { URLS } from "@/constants/urls";

const DEFAULT_VALUE: CreateQuizzRequest = {
	name: "",
	description: "",
	visibility: "private",
};

const MAX_DESCRIPTION = 1000;

const CreateCollectionDialog = () => {
	const router = useRouter();
	const { setToast } = useToast();

	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<CreateQuizzRequest>({
		defaultValues: DEFAULT_VALUE,
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
		watch,
		setError,
	} = form;

	const description = watch("description");
	const name = watch("name");

	const onSubmit = async (data: CreateQuizzRequest) => {
		if (!validate(data)) return;

		try {
			setIsLoading(true);

			const response = await createQuizz(data);

			handleHttpResponse({
				response,
				setToast,
				successState: {
					message: "Quizz created successfully",
				},
				errorState: {
					message: "Quizz creation failed",
				},
				callback: () => {
					router.push(`${URLS.QUIZZES}/${(response as CreateQuizzResponse).id}`);
				},
			});
		} catch {
			setToast({
				type: "error",
				message: "Quiz creation failed",
				title: "Quiz creation failed",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const validate = (data: CreateQuizzRequest): boolean => {
		const result = createQuizzRequest.safeParse(data);
		if (!result.success) {
			result.error.issues.forEach((issue) => {
				setError(issue.path[0] as keyof CreateQuizzRequest, { message: issue.message });
			});
		}
		return result.success;
	};

	return (
		<>
			<DialogHeader>
				<DialogTitle>Create your quiz</DialogTitle>
				<DialogDescription>Organize your questions by grouping them into quizzes.</DialogDescription>
			</DialogHeader>

			<div className="flex flex-col gap-5 py-4 h-[320px]">
				{/* Collection Name & Status */}
				<div className="flex w-full flex-col md:flex-row gap-5 md:gap-2">
					<div className="flex flex-col w-full md:w-3/4 gap-2">
						<Label htmlFor="collection-name">Quiz name</Label>
						<Input
							id="quiz-name"
							className={cn({ "border-red-500": errors.name })}
							placeholder="E.g ReactJs Quiz"
							{...register("name", { required: "Quiz name is required" })}
						/>
					</div>
					<div className="flex flex-col w-full md:w-1/4 gap-2">
						<Label>Status</Label>
						<Select defaultValue="private" {...register("visibility", { required: "Status is required" })}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select here" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="private">Private</SelectItem>
								<SelectItem value="public">Public</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Description */}
				<div className="flex flex-col h-[320px] md:h-full w-full gap-2">
					<Label htmlFor="description">Description</Label>
					<Textarea
						id="description"
						placeholder="This quiz is about..."
						className={cn("resize-none h-full w-full", { "border-red-500": errors.description })}
						{...register("description", { required: "Description is required", maxLength: MAX_DESCRIPTION })}
						maxLength={MAX_DESCRIPTION}
					/>
					<p className="text-sm text-muted-foreground">{MAX_DESCRIPTION - description.length} characters left</p>
				</div>
			</div>

			{/* Footer Buttons */}
			<DialogFooter>
				<DialogClose asChild>
					<Button size="lg" variant="outline">
						Cancel
					</Button>
				</DialogClose>
				<Button
					size="lg"
					type="submit"
					onClick={handleSubmit(onSubmit)}
					disabled={!name.trim() || !description.trim() || !isDirty || isLoading}
				>
					{isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
					Create
				</Button>
			</DialogFooter>
		</>
	);
};

export default CreateCollectionDialog;
