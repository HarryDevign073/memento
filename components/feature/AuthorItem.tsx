import React from "react";
import { useMemo } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface Props {
  username: string;
  usernameAbbre: string;
}

const AuthorItem = ({ username, usernameAbbre }: Props) => {
  const getRandomColor = () => {
    const avatarColors = [
      "bg-red-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-orange-500",
    ];
    const randomIndex = Math.floor(Math.random() * avatarColors.length);
    return avatarColors[randomIndex];
  };

  const randomColor = useMemo(() => getRandomColor(), []);
  return (
    <div className="flex justify-center items-center gap-2">
      <div
        // className={`flex justify-center items-center w-6 h-6 text-white rounded-full text-xs font-bold ${randomColor}`}
        className={`flex justify-center items-center w-6 h-6 text-white rounded-full text-xs font-bold bg-primary/15`}
      >
        <div className="mx-auto text-primary">{usernameAbbre}</div>
      </div>
      <div>{username}</div>
    </div>
  );
};

export default AuthorItem;
