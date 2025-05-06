// import { currentUser } from "@clerk/nextjs";
import LeaderboardItem from "@/fe/components/feature/LeaderboardItem";
import MetricBox from "@/fe/components/feature/Metric";
import QuizItem from "@/fe/components/feature/ListQuizItem";
import { metricItem, recentItem } from "@/fe/constants";
import { leaderboardItem } from "@/fe/constants";
import { redirect } from "next/navigation";

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  //   const user = await currentUser();
  //   if (!user) return null;

  //   const userInfo = await fetchUser(user.id);
  //   if (!userInfo?.onboarded) redirect("/onboarding");

  //   const result = await fetchPosts(
  //     searchParams.page ? +searchParams.page : 1,
  //     30
  //   );

  return (
    <>
      <header className="sticky">
        <h1 className="head-text">Welcome to Memento</h1>
        <p className="sub-text">Can wait to see more of your work</p>
      </header>

      <section className="mt-9 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metricItem.map((metric) => (
              <MetricBox
                key={metric.title}
                iconURL={metric.iconURL}
                title={metric.title}
                value={metric.value}
              />
            ))}
          </div>
          <div className="flex flex-col xl:flex-row gap-4 ">
            <div className="section w-full xl:w-2/3 h-full flex flex-col gap-5">
              <div className="section-title">Recent view</div>
              <div className="flex flex-col gap-3">
                {recentItem.map((item) => (
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
            </div>
            <div className="section w-full xl:w-1/3 max-h-[743px] flex flex-col gap-5">
              <div className="section-title">Leaderboards</div>
              <div className="flex flex-col overflow-auto gap-2">
                {leaderboardItem.map((item) => (
                  <LeaderboardItem
                    key={item.id}
                    rankingOrder={item.rankingOrder}
                    userName={item.userName}
                    questionCount={item.questionCount}
                    likeCount={item.likeCount}
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
