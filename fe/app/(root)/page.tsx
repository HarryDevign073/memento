"use server";

import Image from "next/image";

import { getLeaderboard, getRecentQuizzes } from "@/actions/dashboard";

import { Leaderboard } from "@/types/dashboard";
import { HttpResponse } from "@/types/http";
import { QuizzVisibility, RecentQuizzResponse } from "@/types/quizz";

import ListQuizItem from "@/components/feature/ListQuizItem";
import LeaderboardItem from "@/components/feature/LeaderboardItem";
import EmptyList from "@/components/others/EmptyList";

import Explore from "./components/explore";
import NewQuiz from "./components/new-quiz";

import recentView from "@/public/empty/recent-view.png";
import leaderboard from "@/public/empty/leader-board.png";

const Home = async () => {
	let recentQuizzes: RecentQuizzResponse[] = [];
	let leaderboards: Leaderboard[] = [];

	const [recentRes, leaderboardRes] = await Promise.all([
		await getRecentQuizzes({ visibility: "public" }),
		await getLeaderboard(),
	]);

	if (!(recentRes as HttpResponse)?.error) {
		recentQuizzes = recentRes as RecentQuizzResponse[];
	}

	if (!(leaderboardRes as HttpResponse)?.error) {
		leaderboards = (leaderboardRes as Leaderboard[]).sort((a, b) => b.quiz_like_count - a.quiz_like_count);
	}

	const renderRecentViews = () => {
		if (recentQuizzes.length == 0) {
			return (
				<div className="h-full flex items-center justify-center">
					<EmptyList
						icon={<Image src={recentView} alt="recent-view" width={270} height={200} />}
						title="You haven’t viewed any quizzes yet"
						description="Start exploring quizzes to sharpen your memory and track your progress. Your recently viewed quizzes will show up here."
						actions={
							<div className="flex items-center gap-3">
								<Explore />
								<NewQuiz />
							</div>
						}
					/>
				</div>
			);
		}

		return (
			<>
				{recentQuizzes.map((item, index) => (
					<ListQuizItem
						quizId={item.quiz_id}
						key={`recent-quizz-${index}`}
						quizTitle={item.quiz_name}
						quizDesc={item.quiz_description}
						questionCount={item.quiz_questions_count}
						likeCount={item.quiz_like_count}
						playCount={item.quiz_play_count}
						authorName={item.user_first_name}
						authorNameAbbre={item.user_last_name}
						occupation={item.user_occupation || ""}
						status={item.quiz_visibility as QuizzVisibility}
						layout="list"
						isLiked={item.user_liked}
						editable={false}
						canInteract={false}
					/>
				))}
			</>
		);
	};

	const renderLeaderboards = () => {
		if (leaderboards.length == 0) {
			return (
				<div className="h-full flex items-center justify-center">
					<EmptyList
						icon={<Image src={leaderboard} alt="leader-board" width={270} height={200} />}
						title="🏆 Be the first to make it to the top!"
						description="The more hearts you earn, the higher you rise."
					/>
				</div>
			);
		}

		const topLeaderboards = leaderboards.slice(0, 10); /// TOP 10

		return (
			<>
				{topLeaderboards.map((item, index) => (
					<LeaderboardItem
						key={item.user_id}
						rankingOrder={index + 1}
						userName={item.user_username}
						questionCount={item.quiz_like_count}
						likeCount={item.quiz_like_count}
						lastIndex={index === topLeaderboards.length - 1}
					/>
				))}
			</>
		);
	};

	return (
		<>
			<header className="sticky">
				<h1 className="head-text">Welcome to Memento</h1>
				<p className="sub-text">Can wait to see more of your work</p>
			</header>

			<section className="mt-9 flex flex-col xl:flex-row gap-4 md:h-[80dvh]">
				<div className="section xl:w-2/3 h-full max-h-[80dvh] flex flex-col gap-5">
					<div className="section-title">Recent view</div>
					<div className="h-full flex flex-col overflow-auto gap-2">{renderRecentViews()}</div>
				</div>
				<div className="section w-full xl:w-1/3 flex flex-col max-h-[80dvh] gap-5">
					<div className="section-title">Leaderboards</div>
					<div className="h-full flex flex-col overflow-auto gap-2">{renderLeaderboards()}</div>
				</div>
			</section>
		</>
	);
};

export default Home;
