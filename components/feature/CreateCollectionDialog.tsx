import React from "react";
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

const CreateCollectionDialog = () => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Create your collection</DialogTitle>
        <DialogDescription>
          Organize your quizzes by grouping them into collections.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col md:flex-row gap-2 py-4 h-[320px]">
        <div className="flex flex-col w-3/4 gap-2">
          <Label>Collection name</Label>
          <Input placeholder="E.g ReactJs Collection" />
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <Label>Status</Label>
          <Select defaultValue="private">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select here"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="public">Public</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button size={"lg"} variant={"outline"}>
            Cancel
          </Button>
        </DialogClose>
        <Button size={"lg"} type="submit">
          Create
        </Button>
      </DialogFooter>
    </>
  );
};

export default CreateCollectionDialog;
