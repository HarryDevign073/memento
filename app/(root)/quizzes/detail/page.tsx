// import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Edit,
  Play,
  Sparkles,
} from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import NoQuestionImage from "../../../../public/illustration/no-question.svg";
import CreateQuestionDialog from "@/components/feature/CreateQuestionDialog";

async function QuizDetail() {
  return (
    <>
      <h1 className="head-text">Your collections detail</h1>
      <p className="sub-text">
        Separate your questions into suitable categories
      </p>

      <section className="mt-9 h-full flex flex-col gap-10">
        <div className="flex justify-between items-center w-full">
          <Button variant={"outline"} size={"lg"} >
            <ArrowLeft />
            <div className="hidden md:block">Back</div>
          </Button>

          <div className="flex items-center gap-2">
            <Button disabled variant={"outline"} size={"lg"}>
              <Edit />
              <div className="hidden md:block">Edit</div>
            </Button>
            <Button disabled size={"lg"}>
              <Play /> <div className="hidden md:block">Play</div>
            </Button>
          </div>
        </div>

        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <Image src={NoQuestionImage} alt="No question yet" width={320} />
          <div className="flex flex-col items-center gap-1">
            <h2 className="head-text-sub text-center">
              No questions available yet
            </h2>
            <p className="sub-text text-center">
              Start by creating your questions and add them to this collection
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button size={"lg"}>
                <Sparkles /> Generate Quiz
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[80%]">
              <CreateQuestionDialog />
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </>
  );
}

export default QuizDetail;
