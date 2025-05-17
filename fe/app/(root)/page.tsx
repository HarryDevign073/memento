"use server";

import { List } from "lucide-react";

import { getLeaderboard, getRecentQuizzes } from "@/actions/dashboard";

import QuizItem from "@/components/feature/ListQuizItem";
import LeaderboardItem from "@/components/feature/LeaderboardItem";

import { Leaderboard } from "@/types/dashboard";
import { HttpResponse } from "@/types/http";

async function Home() {
	let recentQuizzes: any[] = [];
	let leaderboards: Leaderboard[] = [];

	const [recentRes, leaderboardRes] = await Promise.all([
		await getRecentQuizzes({ visibility: "public" }),
		await getLeaderboard(),
	]);

	if (!(recentRes as HttpResponse)?.error) {
		recentQuizzes = recentRes as any[];
	}

	if (!(leaderboardRes as HttpResponse)?.error) {
		leaderboards = (leaderboardRes as Leaderboard[]).sort((a, b) => b.quiz_like_count - a.quiz_like_count);
	}

	return (
		<>
			<header className="sticky">
				<h1 className="head-text">Welcome to Memento</h1>
				<p className="sub-text">Can wait to see more of your work</p>
			</header>

			<section className="mt-9 flex flex-col xl:flex-row gap-4 ">
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
			</section>
		</>
	);
}

export default Home;
