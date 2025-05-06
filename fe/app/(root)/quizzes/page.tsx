// import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/fe/components/ui/tabs";
import { Input } from "@/fe/components/ui/input";
import { Button } from "@/fe/components/ui/button";
import { FolderPlus } from "lucide-react";
import Search from "@/fe/components/ui/search";
import { Dialog, DialogContent, DialogTrigger } from "@/fe/components/ui/dialog";
import CreateCollectionDialog from "@/fe/components/feature/Dialog/CreateQuizDialog";
import { metricItem, myItem } from "@/fe/constants";
import QuizItem from "@/fe/components/feature/ListQuizItem";
import MetricBox from "@/fe/components/feature/Metric";

async function Community() {
  return (
    <>
      <h1 className="head-text">Your quizzes</h1>
      <p className="sub-text">
        Separate your questions into suitable categories
      </p>

      <section className="mt-9 flex flex-col gap-5 h-screen">
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
        <Tabs defaultValue="all" className="w-full">
          <div className="flex lg:flex-row flex-col-reverse items-start gap-3 justify-between lg:items-center w-full">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="public">Public</TabsTrigger>
              <TabsTrigger value="private">Private</TabsTrigger>
            </TabsList>
            <div className="flex w-full lg:justify-end items-center gap-2">
              {/* <Input type="search" placeholder="Search..." className="min-w-[320px]" /> */}
              <Search placeholder="Search by quiz name" />

              <Dialog>
                <DialogTrigger asChild>
                  <Button size={"lg"}>
                    <span className="hidden lg:inline-block">
                      <FolderPlus />
                    </span>
                    New Quiz
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[60%]">
                  <CreateCollectionDialog />
                </DialogContent>
              </Dialog>
            </div>
          </div>
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
