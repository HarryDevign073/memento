"use client";

import React, { useMemo, useState } from "react";
import { Controller, FieldErrors, useForm, UseFormReturn } from "react-hook-form";
import { Loader2, Sparkles } from "lucide-react";

import { useToast } from "@/context/toast-context";

import { generateQuestion as generateQuestionByTextOrTopic } from "@/actions/quizz";

import {
	generateQuestion,
	GenerateQuestion,
	MultipleChoiceQuestion,
	QuestionInputType,
	QuestionType,
	Quizz,
	TextQuestion,
	TopicQuestion,
} from "@/types/quizz";
import { HttpResponse } from "@/types/http";

import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import CustomTabs, { ITabItem } from "@/components/custom/CustomTabs";

import FileItem from "@/app/(root)/quizzes/[id]/components/setup/file-item";
import UploadFile from "@/app/(root)/quizzes/[id]/components/setup/upload-file";
import ProcessingDialog from "./ProcessingDialog";
import Radio from "../Radio";

import MultipleIcon from "@/public/assets/multiple-type.svg";
import TrueFalseIcon from "@/public/assets/truefalse-type.svg";
import FillBlankIcon from "@/public/assets/fillblank-type.svg";

import { cn } from "@/lib/utils";
import { handleHttpResponse } from "@/utils/http";
import { generateByFile } from "@/utils/quizz";
import { languages } from "@/constants";

interface GenerateQuestionDialogProps {
	id: number;

	quizzForm: UseFormReturn<Quizz>;

	onClose: () => void;
	setInitialQuizz: (val: Quizz) => void;
}

interface QuestionSelectItem {
	id: string;
	label: string;
	description: string;
	icon: string;
	value: string;
}

const DEFAULT_VALUE: GenerateQuestion = {
	input_type: "text",
	// input_text: "",
	// input_topic: "",
	// input_file: undefined,
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

const MAX_FILE_SIZE = 5 * 1024 * 1024; /// 5MB

const tabs: ITabItem[] = [
	{
		label: "Text",
		value: "text",
	},
	{
		label: "Topic",
		value: "topic",
	},
	{
		label: "Upload",
		value: "file",
	},
];

const GenerateQuestionDialog: React.FC<GenerateQuestionDialogProps> = ({ id, onClose, quizzForm, setInitialQuizz }) => {
	const { setToast } = useToast();

	const [loading, setLoading] = useState(false);
	const [selectedTab, setSelectedTab] = useState<QuestionInputType>("text");

	const form = useForm<GenerateQuestion>({
		defaultValues: DEFAULT_VALUE,
	});

	const {
		control,
		register,
		// handleSubmit,
		formState: { errors, isDirty },
		watch,
		setError,
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

	const onChangeTab = (tab: string) => {
		setSelectedTab(tab as QuestionInputType);
		switch (tab as QuestionInputType) {
			case "text":
				form.setValue("input_type", "text");
				form.setValue("input_file", undefined);
				form.setValue("input_topic", undefined);
				break;
			case "topic":
				form.setValue("input_type", "topic");
				form.setValue("input_text", undefined);
				form.setValue("input_file", undefined);
				break;
			case "file":
				form.setValue("input_type", "file");
				form.setValue("input_text", undefined);
				form.setValue("input_topic", undefined);
				break;
			default:
				break;
		}
	};

	const onGenerateQuestions = async (data: GenerateQuestion) => {
		try {
			const validateData = generateQuestion.safeParse(data);
			if (!validateData.success) {
				return;
			}
			setLoading(true);

			if (selectedTab === "file") {
				generateByInputFile(data);
				return;
			}

			const response = await generateQuestionByTextOrTopic(data, id);

			handleHttpResponse({
				response,
				setToast,
				successState: {
					message: "Questions generated successfully",
				},
				errorState: {
					message: "Failed to generate questions",
				},
				callback: () => {
					updateQuizzForm(response, questionType);

					if (!(response as HttpResponse)?.error) {
						onClose();
					}
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

	const generateByInputFile = async (data: GenerateQuestion) => {
		try {
			const response = await generateByFile(data, id);

			if ((response as any)?.error) {
				setToast({
					type: "error",
					message: (response as any)?.error || "Failed to generate questions",
				});
				return;
			}

			updateQuizzForm(response);

			setToast({
				type: "success",
				message: "Questions generated successfully",
			});

			onClose();
		} catch (error) {
			console.error("Failed to generate questions", error);
			setToast({
				type: "error",
				message: "Failed to generate questions",
			});
		}
	};

	const updateQuizzForm = (response: any, type?: QuestionType) => {
		let quizz: any;

		if ((response as any)?.questions && (response as any)?.id) {
			quizz = {
				id: (response as any)?.id,
				question: (response as any)?.questions || [],
			};
		} else {
			quizz = response as Quizz;
		}

		if (type === "multiple_choice" && quizz?.question) {
			quizz.question = (quizz.question || []).map((q: any) => ({
				choice: q.choices,
				explanation: q.explanation,
				index: q.index,
				question: q.question,
				type: q.type,
			})) as MultipleChoiceQuestion[];
		}

		quizzForm.reset(quizz);
		setInitialQuizz(quizz);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.size > MAX_FILE_SIZE) {
			e.target.value = "";
			setToast({
				type: "error",
				message: "File size must be less than 10MB",
			});
			setError("input_file", {
				type: "manual",
				message: "File size must be less than 10MB",
			});
		} else {
			form.setValue("input_file", file);
		}
	};

	const isDisabled = () => {
		return (
			loading ||
			(selectedTab === "file" && !questionFile) ||
			(selectedTab === "topic" && !questionTopic) ||
			(selectedTab === "text" && !questionInput) ||
			!isDirty
		);
	};

	const renderTabContent = () => {
		switch (selectedTab) {
			case "text":
				return (
					<div className="flex flex-col h-full gap-1.5">
						<Label htmlFor="textContent" className="text-sm font-normal leading-none text-neutral-700">
							Input your context
						</Label>
						<Textarea
							id="textContent"
							className={cn(
								"resize-none h-[320px] md:h-full",
								(errors as FieldErrors<TextQuestion>)?.input_text && "border-red-500"
							)}
							placeholder="Enter here"
							maxLength={MAX_QUESTION_INPUT_LENGTH}
							{...register("input_text", selectedTab === "text" ? { required: true } : {})}
						/>
						<p className="text-sm text-muted-foreground">
							{MAX_QUESTION_INPUT_LENGTH - (questionInput?.length || 0)} characters left
						</p>
					</div>
				);
			case "topic":
				return (
					<div className="flex flex-col h-full gap-2">
						<Label htmlFor="topic" className="text-sm font-normal leading-none text-neutral-700">
							What topic will the questions test?
						</Label>
						<Input
							id="topic"
							className={cn((errors as FieldErrors<TopicQuestion>)?.input_topic && "border-red-500")}
							placeholder="E.g 'ReactJS'"
							{...register("input_topic", selectedTab === "topic" ? { required: true } : {})}
						/>
					</div>
				);
			case "file":
				return (
					<div className="grid w-full items-center gap-3">
						<div className="text-sm font-normal leading-none text-neutral-700">Upload your file</div>
						<Input
							id="file"
							type="file"
							accept=".pdf"
							className="hidden"
							{...register("input_file", {
								...(selectedTab === "file" ? { required: true } : {}),
								onChange: (e) => {
									handleFileChange(e);
								},
							})}
						/>
						{questionFile != undefined && questionFile instanceof File ? (
							<FileItem file={questionFile} onRemove={() => form.setValue("input_file", undefined)} />
						) : (
							<UploadFile id="file" />
						)}
					</div>
				);
			default:
				return null;
		}
	};

	if (loading) {
		return <ProcessingDialog className="mx-auto" />;
	}

	return (
		<>
			<DialogHeader>
				<DialogTitle>Create your questions</DialogTitle>
				<DialogDescription>Using AI to generate your questions from input</DialogDescription>
			</DialogHeader>
			<div className="flex flex-col md:flex-row gap-2 py-4 h-[520px]">
				<div className="md:w-3/5 w-full md:pr-6 md:border-r border-neutral-200 flex flex-col gap-3">
					<CustomTabs
						tabs={tabs}
						selectedTab={selectedTab as string}
						setSelectedTab={onChangeTab}
						isLoading={loading}
					/>
					{renderTabContent()}
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
				<Button size={"lg"} onClick={() => onGenerateQuestions(form.getValues())} disabled={isDisabled()}>
					{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles />}
					Generate
				</Button>
			</DialogFooter>
		</>
	);
};

export default GenerateQuestionDialog;
