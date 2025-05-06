// import { currentUser } from "@clerk/nextjs";
import AnimatedLoading from "@/fe/components/custom/AnimatedLoading";
import CardQuizItem from "@/fe/components/feature/CardQuizItem";
import ProcessingDialog from "@/fe/components/feature/Dialog/ProcessingDialog";
import { communityItem, myItem } from "@/fe/constants";
import { redirect } from "next/navigation";

async function Community() {
  return (
    <>
      <h1 className="head-text">Tracking your activities</h1>
      <p className="sub-text">Tracking your activity feeds</p>

      <section className="w-full mt-9 flex flex-col gap-10">
        <ProcessingDialog />
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-8 w-full">
          {communityItem.map((item) => (
            <CardQuizItem
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
    </>
  );
}

export default Community;
