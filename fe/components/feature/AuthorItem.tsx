import React from "react";
import Image from "next/image";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/fe/components/ui/popover";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/fe/components/ui/hover-card";

import questionIcon from "../../public/assets/file-question.svg";
import likeIcon from "../../public/assets/heart.svg";

interface Props {
  authorName: string;
  authorNameAbbre: string;
  occupation: string;
  authorQuizCount: number;
  authorLikeCount: number;
}

const AuthorItem = ({
  authorName,
  authorNameAbbre,
  occupation,
  authorQuizCount,
  authorLikeCount,
}: Props) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="flex justify-center items-center w-6 h-6 text-white rounded-full text-xs font-bold bg-primary/15 cursor-pointer">
            <div className="mx-auto text-primary text-xs">
              {authorNameAbbre}
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 flex flex-col items-start gap-4">
          {/* Detail Section */}
          <div className="flex justify-center items-center gap-3">
            {/* Avatar */}
            <div className="flex justify-center items-center w-11 h-11 text-white rounded-full text-xs font-bold bg-primary/15 cursor-pointer">
              <div className="mx-auto text-primary text-lg">
                {authorNameAbbre}
              </div>
            </div>
            {/* Name and Occupation */}
            <div className="flex flex-col">
              <div className="text-neutral-900 text-base font-medium leading-6">
                {authorName}
              </div>
              <div className="text-neutral-600 text-ellipsis line-clamp-2 text-sm font-normal leading-5">
                {occupation}
              </div>
            </div>
          </div>

          {/* Count Section */}
          <div className="flex gap-3">
            <div className="flex gap-1.5 items-center">
              <Image src={questionIcon} alt="questionIcon" />
              <span className="text-neutral-600 text-base font-medium leading-6">
                {authorQuizCount}
              </span>
            </div>
            <div className="flex gap-1.5 items-center">
              <Image src={likeIcon} alt="likeIcon" />
              <span className="text-neutral-600 text-base font-medium leading-6">
                {authorLikeCount}
              </span>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default AuthorItem;
