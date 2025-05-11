"use client";

import React, { useState } from "react";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../../ui/button";

const CreateCollectionDialog = () => {
  // State for form fields
  const [collectionName, setCollectionName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("private");

  // Check if both fields are filled
  const isFormValid = collectionName.trim() !== "" && description.trim() !== "";

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create your quiz</DialogTitle>
        <DialogDescription>
          Organize your questions by grouping them into quizzes.
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-5 py-4 h-[320px]">
        {/* Collection Name & Status */}
        <div className="flex w-full flex-col md:flex-row gap-5 md:gap-2">
          <div className="flex flex-col w-full md:w-3/4 gap-2">
            <Label htmlFor="collection-name">Quiz name</Label>
            <Input
              id="quiz-name"
              placeholder="E.g ReactJs Quiz"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full md:w-1/4 gap-2">
            <Label>Status</Label>
            <Select defaultValue={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select here" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="public">Public</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col h-[320px] md:h-full w-full gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="This quiz is about..."
            className="resize-none h-full w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            {1000 - description.length} characters left
          </p>
        </div>
      </div>

      {/* Footer Buttons */}
      <DialogFooter>
        <DialogClose asChild>
          <Button size="lg" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button size="lg" type="submit" disabled={!isFormValid}>
          Create
        </Button>
      </DialogFooter>
    </>
  );
};

export default CreateCollectionDialog;
