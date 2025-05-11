"use client"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EncryptedInput from "./custom/EncryptedInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your Memento account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Start learning smarter with AI-generated quizzes made just for you
        </p>
      </div>
      <div className="grid gap-5">
        {/* First/Last name group */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <div className="grid gap-2 w-full">
            <Label htmlFor="firstname">First Name</Label>
            <Input id="firstname" type="text" placeholder="Harry" required />
          </div>
          <div className="grid gap-2 w-full">
            <Label htmlFor="lastname">Last Name</Label>
            <Input id="lastname" type="text" placeholder="Devign" required />
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="grid gap-2 w-full">
            <Label htmlFor="occupations">Occupations</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="marketer">Marketer</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="writer">Writer</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* <div className="w-full">
            <CustomDatePicker />
          </div> */}
        </div>

        {/* Username */}
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Harry Devign"
            required
          />
        </div>

        {/* Create password group */}
        <EncryptedInput
          inputId="password"
          label="Create your password"
          placeholder="Input your password"
          htmlFor="password"
        />
        <EncryptedInput
          inputId="password"
          label="Confirm your password"
          placeholder="Input your password"
          htmlFor="password"
        />
        {/* <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Confirm your password</Label>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Input your password"
            required
          />
        </div> */}
        <Button type="submit" className="w-full">
          Start Learning
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/" className="underline underline-offset-4">
          Sign in
        </a>
      </div>
    </form>
  );
}
