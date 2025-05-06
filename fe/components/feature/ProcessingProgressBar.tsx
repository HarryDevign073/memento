"use client";

import React from "react";
import { useState } from "react";
import { Progress } from "@/fe/components/ui/progress";

const ProcessingProgressBar = () => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const interval = 100; // ms
    const duration = 10000; // 10 seconds
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-4 w-[80%] mt-3">
      <Progress
        value={progress}
        className="w-full transition-all duration-200 h-3"
      />
      <span className="text-sm text-gray-700 font-medium w-[40px] text-right">
        {Math.round(progress)}%
      </span>
    </div>
  );
};

export default ProcessingProgressBar;
