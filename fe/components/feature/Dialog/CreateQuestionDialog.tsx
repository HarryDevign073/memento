"use client";

import React, { useMemo, useState } from "react";
import { Controller, FieldErrors, useForm, UseFormReturn } from "react-hook-form";
import { Loader2, Sparkles } from "lucide-react";

import { useToast } from "@/context/toast-context";

import { generateQuestion as generateQuestionAction } from "@/actions/quizz";

import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import MultipleIcon from "@/public/assets/multiple-type.svg";
import TrueFalseIcon from "@/public/assets/truefalse-type.svg";
import FillBlankIcon from "@/public/assets/fillblank-type.svg";

import ProcessingDialog from "./ProcessingDialog";
import Radio from "../Radio";

import { GenerateQuestion, QuestionInputType, Quizz, TextQuestion, TopicQuestion } from "@/types/quizz";

import { cn } from "@/lib/utils";
import { languages } from "@/constants";
import { handleHttpResponse } from "@/utils/http";

type Props = {
	id: number;

	quizzForm: UseFormReturn<Quizz>;

	onClose: () => void;
};

interface QuestionSelectItem {
	id: string;
	label: string;
	description: string;
	icon: string;
	value: string;
}

const DEFAULT_VALUE: GenerateQuestion = {
	input_type: "text",
	input_text: "",
	input_topic: "",
	input_file: null,
	question_types: "multiple_choice",
	language: "en",
	difficulty: "easy",
	number_of_options: "3",
};

const MAX_QUESTION_INPUT_LENGTH = 1000;

const NUMBER_OF_OPTIONS_PAIR = [
	{
		index: 0,
		value: 3,
	},
	{
		index: 2,
		value: 4,
	},
	{
		index: 4,
		value: 5,
	},
	{
		index: 6,
		value: 6,
	},
];

const CreateQuestionDialog: React.FC<Props> = ({ id, onClose, quizzForm }) => {
	const { setToast } = useToast();

	const [loading, setLoading] = useState(false);
	const [questionInputType, setQuestionInputType] = useState<QuestionInputType>("text");

	const form = useForm<GenerateQuestion>({
		defaultValues: DEFAULT_VALUE,
	});

	const {
		control,
		register,
		handleSubmit,
		formState: { errors, isDirty },
		watch,
	} = form;

	const questionInput = watch("input_text");
	const questionTopic = watch("input_topic");
	const questionFile = watch("input_file");
	const questionType = watch("question_types");

	const questionTypes = useMemo<QuestionSelectItem[]>(
		() => [
			{
				id: "multiple_choice",
				label: "Multiple choice",
				description: "Choose from a list of options.",
				icon: MultipleIcon,
				value: "multiple_choice",
			},
			{
				id: "true_false",
				label: "True or False",
				description: "Decide whether the statement is true or false.",
				icon: TrueFalseIcon,
				value: "true_false",
			},
			{
				id: "fill_in_the_blank",
				label: "Fill in the Blank",
				description: "Complete by selecting the missing word(s) from the dropdown menu.",
				icon: FillBlankIcon,
				value: "fill_in_the_blank",
			},
		],
		[]
	);

	const onGenerateQuestions = async (data: GenerateQuestion) => {
		try {
			setLoading(true);
			const quizz = await generateQuestionAction(data, id);

			handleHttpResponse({
				response: quizz,
				setToast,
				successState: {
					message: "Questions generated successfully",
				},
				errorState: {
					message: "Failed to generate questions",
				},
				callback: () => {
					quizzForm.reset(quizz as Quizz);
					onClose();
				},
			});
		} catch {
			setToast({
				type: "error",
				message: "Failed to generate questions",
				title: "Failed to generate questions",
			});
		} finally {
			setLoading(false);
		}
	};

	console.info("questionType", questionType);

	if (loading) {
		return <ProcessingDialog />;
	}

	return (
		<>
			<DialogHeader>
				<DialogTitle>Create your questions</DialogTitle>
				<DialogDescription>Using AI to generate your questions from input</DialogDescription>
			</DialogHeader>
			<div className="flex flex-col md:flex-row gap-2 py-4 h-[520px]">
				<div className="md:w-3/5 w-full md:pr-6 md:border-r border-neutral-200">
					<Tabs
						defaultValue="text"
						className="w-full gap-6 h-full"
						onValueChange={(tab) => {
							setQuestionInputType(tab as QuestionInputType);
							form.setValue("input_type", tab as QuestionInputType);
						}}
					>
						<TabsList>
							<TabsTrigger value="text">Text</TabsTrigger>
							<TabsTrigger value="topic">Topic</TabsTrigger>
							<TabsTrigger value="file">Upload</TabsTrigger>
						</TabsList>
						<TabsContent value="text">
							<div className="flex flex-col h-full gap-1.5">
								<Label htmlFor="textContent">Input your context</Label>
								<Textarea
									id="textContent"
									className={cn(
										"resize-none h-[320px] md:h-full",
										(errors as FieldErrors<TextQuestion>)?.input_text && "border-red-500"
									)}
									placeholder="Enter here"
									maxLength={MAX_QUESTION_INPUT_LENGTH}
									{...register("input_text", { required: questionInputType === "text" })}
								/>
								<p className="text-sm text-muted-foreground">
									{MAX_QUESTION_INPUT_LENGTH - questionInput.length} characters left
								</p>
							</div>
						</TabsContent>
						<TabsContent value="topic">
							<div className="flex flex-col h-full gap-2">
								<Label htmlFor="topic">What topic will the questions test?</Label>
								<Input
									id="topic"
									className={cn((errors as FieldErrors<TopicQuestion>)?.input_topic && "border-red-500")}
									placeholder="E.g 'ReactJS'"
									{...register("input_topic", { required: questionInputType === "topic" })}
								/>
							</div>
						</TabsContent>
						<TabsContent value="upload">
							<div className="grid w-full items-center gap-1.5">
								<Label htmlFor="file">Upload your file</Label>
								<Input id="file" type="file" {...register("input_file", { required: questionInputType === "file" })} />
							</div>
						</TabsContent>
					</Tabs>
				</div>
				<div className="w-2/5 md:pl-6 flex flex-col gap-6">
					<div className="grid w-full items-center gap-3">
						<Label htmlFor="file">Choose your question type</Label>

						<Controller
							name="question_types"
							control={control}
							render={({ field }) => (
								<>
									{questionTypes.map((type) => (
										<Radio
											key={type.id}
											id={type.id}
											className={cn(errors.question_types && "border-red-500")}
											label={type.label}
											description={type.description}
											icon={type.icon}
											value={type.value}
											checked={field.value === type.value}
											onChange={field.onChange}
										/>
									))}
								</>
							)}
						/>
					</div>

					<div className="flex flex-col md:flex-row gap-3">
						<div className="flex flex-col w-1/2 gap-2">
							<Label htmlFor="text-content">Language</Label>
							<Controller
								control={control}
								name="language"
								render={({ field }) => (
									<Select defaultValue="en" onValueChange={field.onChange}>
										<SelectTrigger className={cn(errors.language && "border-red-500", "w-full")}>
											<SelectValue placeholder="Select a language" />
										</SelectTrigger>
										<SelectContent>
											{languages.map((lang) => (
												<SelectItem key={lang.value} value={lang.value}>
													{lang.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
							/>
						</div>
						<div className="flex flex-col w-1/2 gap-2">
							<Label htmlFor="text-content">Difficulty</Label>
							<Controller
								control={control}
								name="difficulty"
								render={({ field }) => (
									<Select defaultValue="easy" onValueChange={field.onChange}>
										<SelectTrigger className={cn(errors.difficulty && "border-red-500", "w-full")}>
											<SelectValue placeholder="Select here" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="easy">Easy</SelectItem>
											<SelectItem value="medium">Medium</SelectItem>
											<SelectItem value="hard">Hard</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>
						</div>
					</div>
					{questionType === "multiple_choice" && (
						<div className="flex flex-col gap-4">
							<Label htmlFor="text-content">Number of options</Label>
							<Controller
								control={control}
								name="number_of_options"
								render={({ field }) => (
									<Slider
										max={6}
										step={2}
										onValueChange={(slideVal) => {
											const pair = NUMBER_OF_OPTIONS_PAIR.find((pair) => pair.index === slideVal[0]);
											if (!pair) return;
											field.onChange(pair.value);
										}}
									/>
								)}
							/>
							<div className="flex items-center justify-between">
								<span>3</span>
								<span>4</span>
								<span>5</span>
								<span>6</span>
							</div>
						</div>
					)}
				</div>
			</div>
			<DialogFooter>
				<DialogClose asChild>
					<Button
						size={"lg"}
						type="submit"
						onClick={handleSubmit(onGenerateQuestions)}
						disabled={
							loading ||
							(questionInputType === "file" && !questionFile) ||
							(questionInputType === "topic" && !questionTopic) ||
							(questionInputType === "text" && !questionInput) ||
							!isDirty
						}
					>
						{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles />}
						Generate
					</Button>
				</DialogClose>
			</DialogFooter>
		</>
	);
};

export default CreateQuestionDialog;