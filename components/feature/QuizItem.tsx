"use client";

import Image from "next/image";
import {
  BookText,
  Trash,
  Edit,
  Heart,
  MoreHorizontal,
  Play,
} from "lucide-react";
import questionIcon from "../../public/assets/file-question.svg";
import likeIcon from "../../public/assets/heart.svg";
import playIcon from "../../public/assets/play.svg";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AuthorItem from "./AuthorItem";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import StatusBadge from "../custom/StatusBadge";

interface Props {
  quizTitle: string;
  quizDesc: string;
  questionCount: number;
  likeCount: number;
  playCount: number;
  isActive: boolean;
  authorName: string;
  authorNameAbbre: string;
  authorQuizCount: number;
  authorLikeCount: number;
  occupation: string;
  state: string | null;
}

const QuizItem = ({
  quizTitle,
  quizDesc,
  questionCount,
  likeCount,
  playCount,
  isActive,
  authorName,
  authorNameAbbre,
  authorQuizCount,
  authorLikeCount,
  occupation,
  state,
}: Props) => {
  return (
    <div className="bg-white md:h-[120px] rounded-md border border-neutral-200 pl-3 md:pl-2 pr-3 py-3 md:py-2 flex flex-col md:flex-row gap-2 md:gap-4 relative cursor-pointer transition-transform duration-300 hover:-translate-y-[3px] hover:scale-[1.002] hover:shadow-[0_14px_26px_rgba(0,0,0,0.04)]">
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
          <div className="w-full flex items-center justify-between gap-5">
            <div className="section-title line-clamp-1">{quizTitle}</div>

            {state === "view" && (
              <div>
                {/* Like button */}
                <Heart size={20} />
              </div>
            )}

            {state === "edit" && (
              <div className="flex items-center gap-2">
                {/* Status Badge */}
                <StatusBadge status={isActive} />
                {/* Action Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash color="red" />
                      <span className="text-red-500">Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
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
            {state !== "edit" && (
              <AuthorItem
                authorName={authorName}
                authorNameAbbre={authorNameAbbre}
                occupation={occupation}
                authorQuizCount={authorQuizCount}
                authorLikeCount={authorLikeCount}
              />
            )}
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
