"use client";

import { Input } from "@/fe/components/ui/input";
import { Label } from "@/fe/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";

interface Props {
  htmlFor: string;
  inputId: string;
  label: string;
  placeholder: string;
}

const EncryptedInput = ({ htmlFor, inputId, label, placeholder }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="space-y-2 min-w-[300px] grid gap-0.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      <div className="relative">
        <Input
          id={inputId}
          className="pe-9"
          placeholder={placeholder}
          type={isVisible ? "text" : "password"}
        />
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          aria-controls="password"
        >
          {isVisible ? (
            <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Eye size={16} strokeWidth={2} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
};

export default EncryptedInput;
