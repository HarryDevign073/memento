import { Tabs, TabsContent } from "@/components/ui/tabs";
import QuizItem from "@/components/feature/ListQuizItem";
import MetricBox from "@/components/feature/Metric";

import QuizzFilter from "./components/filter";

import { metricItem, myItem } from "@/constants";

async function Community() {
	return (
		<>
			<h1 className="head-text">Your quizzes</h1>
			<p className="sub-text">Separate your questions into suitable categories</p>

			<section className="mt-9 flex flex-col gap-5 h-screen">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
					{metricItem.map((metric) => (
						<MetricBox key={metric.title} iconURL={metric.iconURL} title={metric.title} value={metric.value} />
					))}
				</div>
				<Tabs defaultValue="all" className="w-full">
					<QuizzFilter />

					<TabsContent value="all">
						<div className="flex flex-col mt-3 gap-3 ">
							{myItem.map((item) => (
								<QuizItem
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
							))}
						</div>
					</TabsContent>
					<TabsContent value="public">
						{myItem.filter((item) => item.isActive).length > 0 ? (
							<div className="flex flex-col mt-3 gap-3">
								{myItem
									.filter((item) => item.isActive)
									.map((item) => (
										<QuizItem
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
									))}
							</div>
						) : (
							<div className="text-muted-foreground mt-4">No Results</div>
						)}
					</TabsContent>
					<TabsContent value="private">
						{myItem.filter((item) => item.isActive).length > 0 ? (
							<div className="flex flex-col mt-3 gap-3">
								{myItem
									.filter((item) => item.isActive === false)
									.map((item) => (
										<QuizItem
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
									))}
							</div>
						) : (
							<div className="text-muted-foreground mt-4">No Results</div>
						)}
					</TabsContent>
				</Tabs>
			</section>
		</>
	);
}

export default Community;