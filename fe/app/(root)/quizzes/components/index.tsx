"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { FolderPlus } from "lucide-react";

import { getListQuizz, likeQuizz, unlikeQuizz } from "@/actions/quizz";

import { QuizzListResponse } from "@/types/quizz";

import MetricBox from "@/components/feature/Metric";
import EmptyList from "@/components/others/EmptyList";

import QuizzView from "./quizz-view";

import useDebounce from "@/hooks/useDebounce";
import { QUERY_KEY } from "@/constants/query-key";

import recentView from "@/public/empty/recent-view.png";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import UpsertQuizzDialog from "@/components/feature/Dialog/UpsertQuizzDialog";

export const QUIZZ_SEARCH_PARAMS = {
  search: parseAsString,
  sort: parseAsString,
  filter: parseAsString,
  checkedUser: parseAsBoolean,
};

const metricBoxs = [
  "user_quiz_count",
  "user_question_count",
  "user_play_count",
  "user_like_count",
];

const Quizzes = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const [query, setQuery] = useQueryStates(QUIZZ_SEARCH_PARAMS);
  const [tab, setTab] = useState<"all" | "public" | "private">("all");
  const [upsertQuizDialog, setUpsertQuizDialog] = useState<boolean>(false);

  const debouncedQuery = useDebounce(query, 500);

  const { data: quizzResult, isLoading } = useQuery({
    queryKey: [QUERY_KEY.QUIZZ_LIST, debouncedQuery, tab],
    queryFn: () => {
      const res = getListQuizz({
        search: query.search || undefined || "",
        sort: (query.sort as "desc" | "asc") || "desc",
        filter: (query.filter as "all" | "favorites") || "all",
        checkedUser: query.checkedUser || true,
        ...(tab === "all" ? {} : { visibility: tab }),
      });

      if (!res || "error" in res) {
        return {
          quizzes: [],
          statistics: {
            user_quiz_count: 0,
            user_question_count: 0,
            user_play_count: 0,
            user_like_count: 0,
          },
        };
      }

      return res;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    // Go from home page
    if (searchParams.get("previous_path") === "home") {
      setUpsertQuizDialog(true);
    }
  }, [searchParams]);

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

  const updateCachedQuiz = (quizId: number, option: "like" | "unlike") => {
    queryClient.setQueryData(
      [QUERY_KEY.QUIZZ_LIST, debouncedQuery, tab],
      (oldData: QuizzListResponse) => {
        return {
          ...oldData,
          quizzes: oldData.quizzes.map((quiz) =>
            quiz.quiz_id === quizId
              ? {
                  ...quiz,
                  user_liked: option === "like",
                  quiz_like_count:
                    option === "like"
                      ? quiz.quiz_like_count + 1
                      : quiz.quiz_like_count - 1,
                }
              : quiz
          ),
        };
      }
    );
  };

  const { mutate: likeQuiz } = useMutation({
    mutationFn: async (quizId: number) => {
      await likeQuizz(quizId);
      updateCachedQuiz(quizId, "like");
    },
  });

  const { mutate: unlikeQuiz } = useMutation({
    mutationFn: async (quizId: number) => {
      await unlikeQuizz(quizId);
      updateCachedQuiz(quizId, "unlike");
    },
  });

  const handleInteract = (option: "like" | "unlike", quizId: number) => {
    switch (option) {
      case "like":
        likeQuiz(quizId);
        break;
      case "unlike":
        unlikeQuiz(quizId);
        break;
      default:
        break;
    }
  };

  const renderContent = () => {
    if (
      !((quizzResult as QuizzListResponse)?.quizzes ?? []).length &&
      !query?.search &&
      !isLoading &&
      tab === "all"
    ) {
      return (
          <div className="h-fit py-20 flex flex-col items-center justify-center">
            <EmptyList
              icon={
                <Image
                  src={recentView}
                  alt="recent-view"
                  width={270}
                  height={200}
                />
              }
              title="You haven’t created any quizzes yet"
              description="Start building your first quiz to challenge others and share what you know. Your created quizzes will appear here."
            />
            <Button
              size={"lg"}
              onClick={() => setUpsertQuizDialog(true)}
              disabled={isLoading}
              className="w-fit mx-auto mt-6"
            >
              <span className="hidden lg:inline-block">
                <FolderPlus />
              </span>
              New Quiz
            </Button>
          </div>
      );
    }

    return (
      <QuizzView
        quizzResult={quizzResult as QuizzListResponse}
        tab={tab}
        setTab={setTab}
        query={{
          search: query.search || undefined,
          sort: query.sort as "desc" | "asc" | undefined,
          filter: query.filter as "all" | "favorites" | undefined,
          checkedUser: query.checkedUser || true,
        }}
        setQuery={setQuery}
        isLoading={isLoading}
        upsertQuizDialog={upsertQuizDialog}
        setUpsertQuizDialog={setUpsertQuizDialog}
        handleInteract={handleInteract}
      />
    );
  };

  return (
    <>
      <header className="sticky">
        <h1 className="head-text">Your quizzes</h1>
        <p className="sub-text">
          Separate your questions into suitable categories
        </p>
      </header>

      <section
        className={cn(
          "mt-9 flex flex-col gap-5",
          !((quizzResult as QuizzListResponse)?.quizzes ?? []).length &&
            !query?.search &&
            !isLoading
            ? "h-fit"
            : " h-screen"
        )}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metricBoxs.map((key) => (
            <MetricBox
              key={key}
              iconURL={getMetricIconURL(key)}
              title={getMetricTitle(key)}
              value={
                (quizzResult as QuizzListResponse)?.statistics?.[
                  key as keyof QuizzListResponse["statistics"]
                ]
              }
            />
          ))}
        </div>

        {renderContent()}
      </section>

      <Dialog open={upsertQuizDialog} onOpenChange={setUpsertQuizDialog}>
        <DialogContent
          className="sm:max-w-[60%]"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <UpsertQuizzDialog onCloseDialog={() => setUpsertQuizDialog(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Quizzes;
