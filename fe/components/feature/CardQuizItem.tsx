import React from "react";
import {
  BookText,
  Edit,
  Heart,
  MoreHorizontal,
  Play,
  Trash,
} from "lucide-react";
import Image from "next/image";
import StatusBadge from "../custom/StatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import questionIcon from "@/public/assets/file-question.svg";
import likeIcon from "@/public/assets/heart.svg";
import playIcon from "@/public/assets/play.svg";
import AuthorItem from "./AuthorItem";

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

const CardQuizItem = ({
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
    <div className="p-3 rounded-md border border-neutral-200 bg-white hover-animation">
      {isActive ? (
        // Active State
        <div className="relative w-full h-[120px] rounded-md flex items-center justify-center purple-bg-gradient flex-shrink-0">
          <BookText color="white" />
          {state === "edit" && (
            <div className="block absolute bottom-2 left-2">
              {/* Status Badge */}
              <StatusBadge status={isActive} />
            </div>
          )}
          {state === "view" && (
            <div className="block absolute top-2 right-2">
              {/* Like button */}
              <Heart size={20} color="white" />
            </div>
          )}
        </div>
      ) : (
        // Inactive State
        <div className="relative w-full h-[120px] rounded-md flex items-center justify-center bg-neutral-300 flex-shrink-0">
          <BookText color="white" />
          {state === "edit" && (
            <div className="block absolute bottom-2 left-2">
              {/* Status Badge */}
              <StatusBadge status={isActive} />
            </div>
          )}
          {state === "view" && (
            <div className="block absolute top-2 right-2">
              {/* Like button */}
              <Heart size={20} color="white" />
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2 md:justify-between w-full relative p-2 ">
        <div>
          <div className="w-full flex items-center justify-between gap-5">
            <div className="section-title line-clamp-1">{quizTitle}</div>

            {state === "edit" && (
              <div className="flex items-center gap-2">
                {/* Status Badge
                <StatusBadge status={isActive} /> */}
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

export default CardQuizItem;
