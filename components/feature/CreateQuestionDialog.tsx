"use client"

import React, { useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import Image from "next/image";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import MultipleIcon from "../../public/assets/multiple-type.svg";
import TrueFalseIcon from "../../public/assets/truefalse-type.svg";
import FillBlankIcon from "../../public/assets/fillblank-type.svg";
import { Slider } from "@/components/ui/slider";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

const CreateQuestionDialog = () => {
  const [context, setContext] = useState("");
  return (
    <>
      <DialogHeader>
        <DialogTitle>Create your questions</DialogTitle>
        <DialogDescription>
          Using AI to generate your questions from input
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col md:flex-row gap-2 py-4 h-[520px]">
        <div className="md:w-3/5 w-full md:pr-6 md:border-r border-neutral-200">
          <Tabs defaultValue="text" className="w-full gap-6 h-full">
            <TabsList>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="topic">Topic</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
            </TabsList>
            <TabsContent value="text">
              <div className="flex flex-col h-full gap-1.5">
                <Label htmlFor="textContent">Input your context</Label>
                <Textarea
                  placeholder="Enter here"
                  id="textContent"
                  className="resize-none h-[320px] md:h-full"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  {1000 - context.length} characters left
                </p>
              </div>
            </TabsContent>
            <TabsContent value="topic">
              <div className="flex flex-col h-full gap-2">
                <Label htmlFor="topic">
                  What topic will the questions test?
                </Label>
                <Input placeholder="E.g 'ReactJS'" id="topic" />
              </div>
            </TabsContent>
            <TabsContent value="upload">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="file">Upload your file</Label>
                <Input id="file" type="file" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-2/5 md:pl-6 flex flex-col gap-6">
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="file">Choose your question type</Label>

            {/* Multiple Type */}
            <div className="relative">
              <Input
                type="radio"
                name="questionType"
                id="multipleType"
                className="hidden peer"
                defaultChecked
              />
              <label
                htmlFor="multipleType"
                className="relative flex gap-3 p-3 border border-neutral-200 rounded-lg items-start peer-checked:outline-2 peer-checked:outline-[#7F56D9] cursor-pointer"
              >
                <Image src={MultipleIcon} alt="Multiple Type" />

                <div className="flex flex-col">
                  <div className="text-neutral-700 text-sm font-medium leading-5">
                    Multiple choice
                  </div>
                  <div className="self-stretch text-neutral-600 text-sm font-normal leading-5">
                    Choose from a list of options.
                  </div>
                </div>
              </label>
              <div className="flex items-center justify-center absolute top-2 right-2 w-5 h-5 bg-[#7F56D9] rounded-full scale-0 peer-checked:scale-100 transition delay-100">
                <Check size={"12"} color="white" />
              </div>
            </div>

            {/* True False Type */}
            <div className="relative">
              <Input
                type="radio"
                name="questionType"
                id="trueFalseType"
                className="hidden peer"
              />
              <label
                htmlFor="trueFalseType"
                className="relative flex gap-3 p-3 border border-neutral-200 rounded-lg items-start  peer-checked:outline-2 peer-checked:outline-[#7F56D9] cursor-pointer"
              >
                <Image src={TrueFalseIcon} alt="True False Type" />

                <div className="flex flex-col">
                  <div className="text-neutral-700 text-sm font-medium leading-5">
                    True or False
                  </div>
                  <div className="self-stretch text-neutral-600 text-sm font-normal leading-5">
                    Decide whether the statement is true or false.
                  </div>
                </div>
              </label>
              <div className="flex items-center justify-center absolute top-2 right-2 w-5 h-5 bg-[#7F56D9] rounded-full scale-0 peer-checked:scale-100 transition delay-100">
                <Check size={"12"} color="white" />
              </div>
            </div>
            {/* Fill Blank Type */}
            <div className="relative">
              <Input
                type="radio"
                name="questionType"
                id="fillBlankType"
                className="hidden peer"
              />
              <label
                htmlFor="fillBlankType"
                className="relative flex gap-3 p-3 border border-neutral-200 rounded-lg items-start  peer-checked:outline-2 peer-checked:outline-[#7F56D9] cursor-pointer"
              >
                <Image src={FillBlankIcon} alt="Fill Blank Type" />

                <div className="flex flex-col">
                  <div className="text-neutral-700 text-sm font-medium leading-5">
                    Fill in the Blank
                  </div>
                  <div className="self-stretch text-neutral-600 text-sm font-normal leading-5">
                    Complete by selecting the missing word(s) from the dropdown
                    menu.
                  </div>
                </div>
              </label>
              <div className="flex items-center justify-center absolute top-2 right-2 w-5 h-5 bg-[#7F56D9] rounded-full scale-0 peer-checked:scale-100 transition delay-100">
                <Check size={"12"} color="white" />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex flex-col w-1/2 gap-2">
              <Label htmlFor="text-content">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="am">Amharic</SelectItem>
                  <SelectItem value="ar">Arabic</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="he">Hebrew</SelectItem>
                  <SelectItem value="it">Italian</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                  <SelectItem value="ko">Korean</SelectItem>
                  <SelectItem value="nl">Dutch</SelectItem>
                  <SelectItem value="pt">Portuguese</SelectItem>
                  <SelectItem value="ru">Russian</SelectItem>
                  <SelectItem value="sw">Swahili</SelectItem>
                  <SelectItem value="th">Thai</SelectItem>
                  <SelectItem value="vi">Vietnamese</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col w-1/2 gap-2">
              <Label htmlFor="text-content">Difficulty</Label>
              <Select defaultValue="easy">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select here" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="text-content">Number of options</Label>
            <Slider defaultValue={[0]} max={3} step={1} />
            <div className="flex items-center justify-between">
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button size={"lg"} type="submit">
            <Sparkles /> Generate
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};

export default CreateQuestionDialog;
