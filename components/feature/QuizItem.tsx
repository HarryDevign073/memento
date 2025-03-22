"use client";

import Image from "next/image";
import { BookText, Play } from "lucide-react";
import questionIcon from "../../public/assets/file-question.svg";
import likeIcon from "../../public/assets/heart.svg";
import playIcon from "../../public/assets/play.svg";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AuthorItem from "./AuthorItem";

interface Props {
  quizTitle: string;
  quizDesc: string;
  questionCount: number;
  likeCount: number;
  playCount: number;
  isActive?: boolean;
  username: string;
  usernameAbbre: string;
}

const QuizItem = ({
  quizTitle,
  quizDesc,
  questionCount,
  likeCount,
  playCount,
  isActive,
  username,
  usernameAbbre,
}: Props) => {
  return (
    <div className="bg-white md:h-[120px] rounded-md border border-neutral-200 pl-2 pr-3 py-2 flex flex-col md:flex-row gap-2 md:gap-4 ">
      {isActive ? (
        // Active State
        <div className="w-full h-[100px] md:h-full md:w-[102px] rounded-md flex items-center justify-center purple-bg-gradient flex-shrink-0">
          <BookText color="white" />
        </div>
      ) : (
        // Inactive State
        <div className="w-full h-[100px] md:h-full md:w-[102px] rounded-md flex items-center justify-center bg-neutral-300 flex-shrink-0">
          <BookText color="white" />
        </div>
      )}
      <div className="flex flex-col gap-2 md:gap-0 md:justify-between w-full relative">
        <div>
          <div className="section-title">{quizTitle}</div>
          <p className="text-neutral-600 text-ellipsis line-clamp-2 text-sm font-normal leading-5">
            {quizDesc}
          </p>
        </div>
        <div className="flex justify-between items-center self-stretch">
          <div className="flex gap-3 ">
            <div className="flex gap-1.5 items-center">
              <Image src={questionIcon} alt="questionIcon" />
              <span className="text-neutral-600 text-base font-medium leading-6">
                {questionCount}
              </span>
            </div>
            <div className="flex gap-1.5 items-center">
              <Image src={likeIcon} alt="likeIcon" />
              <span className="text-neutral-600 text-base font-medium leading-6">
                {likeCount}
              </span>
            </div>
            <div className="flex gap-1.5 items-center">
              <Image src={playIcon} alt="playIcon" />
              <span className="text-neutral-600 text-base font-medium leading-6">
                {playCount}
              </span>
            </div>
            <AuthorItem username={username} usernameAbbre={usernameAbbre} />
          </div>
          <Button size={"sm"}>
            <Play /> <div className="hidden md:block">Play</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizItem;
