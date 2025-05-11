"use client";

import React, { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Sparkles } from "lucide-react";

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

import { GenerateQuestion } from "@/types/quizz";

const DEFAULT_VALUE: GenerateQuestion = {
	input_type: "text",
	input_text: "",
	question_type: ["multiple_choice"],
	language: "en",
	difficulty: "easy",
	number_of_options: "3",
};

const MAX_QUESTION_INPUT_LENGTH = 1000;

const CreateQuestionDialog = () => {
	const [loading, setLoading] = useState(false);

	const form = useForm<GenerateQuestion>({
		defaultValues: DEFAULT_VALUE,
	});

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = form;

	const questionInput = watch("input_text");
	const questionType = watch("question_type");
	const numberOfOptions = watch("number_of_options");

	const questionTypes = useMemo<
		{
			id: string;
			label: string;
			description: string;
			icon: string;
			value: string;
		}[]
	>(
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

	console.log(numberOfOptions);

	const handleGenerate = () => {
		setLoading(true);

		// Simulate loading or call your API here
		// setTimeout(() => {
		//   // For demo purposes – you can remove this if actual async action happens
		//   // console.log("Generated from:", context);
		//   // ... you may call your API here
		// }, 10000);
	};

	return (
		<>
			{loading ? (
				<ProcessingDialog />
			) : (
				<>
					<DialogHeader>
						<DialogTitle>Create your questions</DialogTitle>
						<DialogDescription>Using AI to generate your questions from input</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col md:flex-row gap-2 py-4 h-[520px]">
						<div className="md:w-3/5 w-full md:pr-6 md:border-r border-neutral-200">
							<Tabs defaultValue="text" className="w-full gap-6 h-full">
								<TabsList>
									<TabsTrigger value="text">Text</TabsTrigger>
									<TabsTrigger value="topic">Topic</TabsTrigger>
									<TabsTrigger value="upload">Upload</TabsTrigger>
								</TabsList>
								<TabsContent value="text">
									<div className="flex flex-col h-full gap-1.5">
										<Label htmlFor="textContent">Input your context</Label>
										<Textarea
											placeholder="Enter here"
											id="textContent"
											className="resize-none h-[320px] md:h-full"
											maxLength={MAX_QUESTION_INPUT_LENGTH}
											{...register("input_text", { required: true })}
										/>
										<p className="text-sm text-muted-foreground">
											{MAX_QUESTION_INPUT_LENGTH - questionInput.length} characters left
										</p>
									</div>
								</TabsContent>
								<TabsContent value="topic">
									<div className="flex flex-col h-full gap-2">
										<Label htmlFor="topic">What topic will the questions test?</Label>
										<Input placeholder="E.g 'ReactJS'" id="topic" {...register("input_text", { required: true })} />
									</div>
								</TabsContent>
								<TabsContent value="upload">
									<div className="grid w-full items-center gap-1.5">
										<Label htmlFor="file">Upload your file</Label>
										<Input id="file" type="file" />
									</div>
								</TabsContent>
							</Tabs>
						</div>
						<div className="w-2/5 md:pl-6 flex flex-col gap-6">
							<div className="grid w-full items-center gap-3">
								<Label htmlFor="file">Choose your question type</Label>

								<Controller
									name="question_type"
									control={control}
									render={({ field }) => (
										<>
											<Radio
												id="multiple_choice"
												label="Multiple choice"
												description="Choose from a list of options."
												icon={MultipleIcon}
												value="multiple_choice"
												checked={field.value.includes("multiple_choice")}
												onChange={(event) => field.onChange([event.target.value])}
											/>
											<Radio
												id="true_false"
												label="True or False"
												description="Decide whether the statement is true or false."
												icon={TrueFalseIcon}
												value="true_false"
												checked={field.value.includes("true_false")}
												onChange={(event) => field.onChange([event.target.value])}
											/>
											<Radio
												id="fill_in_the_blank"
												label="Fill in the Blank"
												description="Complete by selecting the missing word(s) from the dropdown menu."
												icon={FillBlankIcon}
												value="fill_in_the_blank"
												checked={field.value.includes("fill_in_the_blank")}
												onChange={(event) => field.onChange([event.target.value])}
											/>
										</>
									)}
								/>
							</div>

							<div className="flex flex-col md:flex-row gap-3">
								<div className="flex flex-col w-1/2 gap-2">
									<Label htmlFor="text-content">Language</Label>
									<Select defaultValue="en" {...register("language", { required: true })}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select a language" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="am">Amharic</SelectItem>
											<SelectItem value="ar">Arabic</SelectItem>
											<SelectItem value="de">German</SelectItem>
											<SelectItem value="en">English</SelectItem>
											<SelectItem value="es">Spanish</SelectItem>
											<SelectItem value="fr">French</SelectItem>
											<SelectItem value="hi">Hindi</SelectItem>
											<SelectItem value="he">Hebrew</SelectItem>
											<SelectItem value="it">Italian</SelectItem>
											<SelectItem value="ja">Japanese</SelectItem>
											<SelectItem value="ko">Korean</SelectItem>
											<SelectItem value="nl">Dutch</SelectItem>
											<SelectItem value="pt">Portuguese</SelectItem>
											<SelectItem value="ru">Russian</SelectItem>
											<SelectItem value="sw">Swahili</SelectItem>
											<SelectItem value="th">Thai</SelectItem>
											<SelectItem value="vi">Vietnamese</SelectItem>
											<SelectItem value="zh">Chinese</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="flex flex-col w-1/2 gap-2">
									<Label htmlFor="text-content">Difficulty</Label>
									<Select defaultValue="easy" {...register("difficulty", { required: true })}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select here" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="easy">Easy</SelectItem>
											<SelectItem value="medium">Medium</SelectItem>
											<SelectItem value="hard">Hard</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="flex flex-col gap-4">
								<Label htmlFor="text-content">Number of options</Label>
								<Controller
									control={control}
									name="number_of_options"
									render={({ field }) => (
										<Slider
											defaultValue={[3]}
											max={3}
											step={1}
											onChange={(value) => {
												console.info("val", value);
												field.onChange(value);
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
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button size={"lg"} type="submit" onClick={handleGenerate}>
								<Sparkles /> Generate
							</Button>
						</DialogClose>
					</DialogFooter>
				</>
			)}
		</>
	);
};

export default CreateQuestionDialog;