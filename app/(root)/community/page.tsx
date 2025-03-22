// import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Search from "@/components/ui/search";
import { communityItem } from "@/constants";
import QuizItem from "@/components/feature/QuizItem";

async function Community() {
  return (
    <section className="w-full pt-8 flex flex-col justify-center items-center">
      {/* Title and Search bar */}
      <div className="w-full flex flex-col justify-between items-center">
        <h1 className="head-text text-center">Welcome to Memento Community</h1>
        <p className="sub-text text-center">
          Explore thousands of big idea from others users.
        </p>
        <div className="max-w-[60%] pt-6">
          <Search placeholder="Search by quiz name" />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-8 lg:max-w-[80%] w-full">
        {communityItem.map((item) => (
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
    </section>
  );
}

export default Community;
