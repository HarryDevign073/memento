import { List } from "lucide-react";

import { getLeaderboard, getRecentQuizzes, getStatistics } from "@/actions/dashboard";

import MetricBox from "@/components/feature/Metric";
import QuizItem from "@/components/feature/ListQuizItem";
import LeaderboardItem from "@/components/feature/LeaderboardItem";

import { Leaderboard, Statistics } from "@/types/dashboard";
import { HttpResponse } from "@/types/http";

const metricBoxs = ["user_quiz_count", "user_question_count", "user_play_count", "user_like_count"];

async function Home() {
	let statistics: Statistics | undefined = undefined;
	let recentQuizzes: any[] = [];
	let leaderboards: Leaderboard[] = [];

	const [statRes, recentRes, leaderboardRes] = await Promise.all([
		await getStatistics(),
		await getRecentQuizzes({ visibility: "public" }),
		await getLeaderboard(),
	]);

	if (!(statRes as HttpResponse)?.error) {
		statistics = statRes as Statistics;
	}

	if (!(recentRes as HttpResponse)?.error) {
		recentQuizzes = recentRes as any[];
	}

	if (!(leaderboardRes as HttpResponse)?.error) {
		leaderboards = (leaderboardRes as Leaderboard[]).sort((a, b) => b.quiz_like_count - a.quiz_like_count);
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
				<h1 className="head-text">Welcome to Memento</h1>
				<p className="sub-text">Can wait to see more of your work</p>
			</header>

			<section className="mt-9 flex flex-col gap-10">
				<div className="flex flex-col gap-4">
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
					<div className="flex flex-col xl:flex-row gap-4 ">
						<div className="section xl:w-2/3 h-full flex flex-col gap-5">
							<div className="section-title">Recent view</div>
							<div className="flex flex-col gap-3">
								{recentQuizzes.length == 0 ? (
									<div className="flex justify-center items-center h-full">
										<div className="w-9 h-9 rounded-md flex items-center justify-center">
											<List size={24} className="text-neutral-600" />
										</div>
										<p className="text-gray-500">No recent quizzes</p>
									</div>
								) : (
									recentQuizzes.map((item) => (
										<QuizItem
											quizId={item.id}
											key={item.id}
											quizTitle={item.quizTitle}
											quizDesc={item.quizDesc}
											questionCount={item.questionCount}
											likeCount={item.likeCount}
											playCount={item.playCount}
											isActive={item.isActive}
											authorName={item.authorName}
											authorNameAbbre={item.authorNameAbbre}
											authorQuizCount={item.authorQuizCount}
											authorLikeCount={item.authorLikeCount}
											occupation={item.occupation}
											state={item.state}
										/>
									))
								)}
							</div>
						</div>
						<div className="section w-full xl:w-1/3 max-h-[743px] flex flex-col gap-5">
							<div className="section-title">Leaderboards</div>
							<div className="flex flex-col overflow-auto gap-2">
								{leaderboards.map((item, index) => (
									<LeaderboardItem
										key={item.user_id}
										rankingOrder={index + 1}
										userName={item.user_username}
										questionCount={item.quiz_like_count}
										likeCount={item.quiz_like_count}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Home;
