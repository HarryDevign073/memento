"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { LoaderCircle, Search as SearchIcon } from "lucide-react";
import { useEffect, useId, useState } from "react";

interface Props {
  placeholder?: string;
}

const Search = ({placeholder}:Props) => {
  const id = useId();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [inputValue]);

  return (
    <div className="space-y-2 min-w-[300px]">
      <div className="relative">
        <Input
          id={id}
          className="peer ps-9"
          placeholder={placeholder}
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          {isLoading ? (
            <LoaderCircle
              className="animate-spin"
              size={16}
              strokeWidth={2}
              role="status"
              aria-label="Loading..."
            />
          ) : (
            <SearchIcon size={16} strokeWidth={2} aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
