"use server";

import { getStatistics } from "@/actions/dashboard";

import MetricBox from "@/components/feature/Metric";

import Quizzes from "./components";

import { Statistics } from "@/types/dashboard";

import { handleHttpResponse } from "@/utils/http";

const metricBoxs = ["user_quiz_count", "user_question_count", "user_play_count", "user_like_count"];

const QuizzContainer = async () => {
	let statistics: Statistics | undefined = undefined;

	try {
		const statRes = await getStatistics();

		handleHttpResponse({
			response: statRes,
			callback: () => {
				statistics = statRes as Statistics;
			},
		});
	} catch (error) {
		console.log("Failed to fetch statistics", error);
	}

	const getMetricIconURL = (key: string): string => {
		switch (key) {
			case "user_quiz_count":
				return "/assets/quiz.svg";
			case "user_question_count":
				return "/assets/file-question.svg";
			case "user_play_count":
				return "/assets/play.svg";
			default:
				return "/assets/heart.svg";
		}
	};

	const getMetricTitle = (key: string): string => {
		switch (key) {
			case "user_quiz_count":
				return "Total Quizzes";
			case "user_question_count":
				return "Total Questions";
			case "user_play_count":
				return "Total Plays";
			default:
				return "Total Liked";
		}
	};

	return (
		<>
			<header className="sticky">
				<h1 className="head-text">Your quizzes</h1>
				<p className="sub-text">Separate your questions into suitable categories</p>
			</header>

			<section className="mt-9 flex flex-col gap-5 h-screen">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
					{metricBoxs.map((key) => (
						<MetricBox
							key={key}
							iconURL={getMetricIconURL(key)}
							title={getMetricTitle(key)}
							value={statistics?.[key as keyof typeof statistics] || 0}
						/>
					))}
				</div>

				<Quizzes />
			</section>
		</>
	);
};

export default QuizzContainer;
