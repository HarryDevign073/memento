"use client";

import PlaySection from "@/components/feature/Play/PlaySection";
import { useParams } from "next/navigation";

export default function PlayQuizPage() {
  const { quizId } = useParams();

  return (
    <div className="h-full w-full flex items-center justify-center">
      <h1 className="text-2xl font-bold">Playing Quiz: {quizId}</h1>
      <PlaySection />
    </div>
  );
}
