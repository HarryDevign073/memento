"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import collectionIcon from "../../public/assets/collection-white.svg";
import questionIcon from "../../public/assets/file-question.svg";
import likeIcon from "../../public/assets/heart.svg";
import playIcon from "../../public/assets/play.svg";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";

interface Props {
  quizTitle: string;
  quizDesc: string;
  questionCount: number;
  likeCount: number;
  playCount: number;
}

const RecentItem = ({
  quizTitle,
  quizDesc,
  questionCount,
  likeCount,
  playCount,
}: Props) => {
  return (
    <div className="bg-white md:h-[120px] rounded-md border border-neutral-200 pl-2 pr-3 py-2 flex flex-col md:flex-row gap-2 md:gap-4 ">
      <div className="w-full h-[100px] md:h-full md:w-[102px] rounded-md flex items-center justify-center purple-bg-gradient flex-shrink-0">
        <Image
          src={collectionIcon}
          alt="collection_thumbnail"
          className="fill-white"
        />
      </div>
      <div className="flex flex-col gap-2 md:gap-0 md:justify-between w-full relative">
        <div>
          <div className="section-title">{quizTitle}</div>
          <p className="text-neutral-600 text-ellipsis line-clamp-2 text-sm font-normal leading-5">
            {quizDesc}
          </p>
        </div>
        <div className="flex justify-between items-center self-stretch">
          <div className="flex gap-3 ">
            <div className="flex gap-2 items-center">
              <Image src={questionIcon} alt="questionIcon" />
              <span className="text-neutral-600 text-base font-medium leading-6">
                {questionCount}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <Image src={likeIcon} alt="likeIcon" />
              <span className="text-neutral-600 text-base font-medium leading-6">
                {likeCount}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <Image src={playIcon} alt="playIcon" />
              <span className="text-neutral-600 text-base font-medium leading-6">
                {playCount}
              </span>
            </div>
          </div>
          <Button size={"sm"}>
            <Play /> <div className="hidden md:block">Play</div>
          </Button>
        </div>
        <Avatar className="absolute top-1 right-1 w-6 h-6">
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
      </div>
    </div>
  );
};

export default RecentItem;
