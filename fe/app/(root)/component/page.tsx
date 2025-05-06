"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/fe/components/ui/alert-dialog";
import { Button } from "@/fe/components/ui/button";
import { toast } from "sonner";

function Component() {
  return (
    <>
      <h1 className="head-text">Components list</h1>
      <p className="sub-text">For tracking internal</p>

      <section className="mt-9 flex flex-col gap-4">
        <h2 className="head-text">Dialog</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-2 w-full">
          {/* Unsaved Confirmation */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Unsaved Confirmation</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Discard changes?</AlertDialogTitle>
                <AlertDialogDescription>
                  You have unsaved changes. If you leave now, all the
                  information you entered will be lost. Are you sure you want to
                  discard your changes?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Discard</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Delete Quiz */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Delete Quiz</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete [Quiz's name] ?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. All questions in this quiz will
                  be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Delete Question */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Delete Question</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete [Question's title] ?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. Are you sure you want to delete
                  this question?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      <section className="mt-9 flex flex-col gap-2">
        <h2 className="head-text">Toast messages</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 w-full">
          {/* Create Quiz */}
          <div className="flex flex-col gap-2">
            <h3 className="sub-text">Create Quiz</h3>
            <Button
              className="bg-green-600 hover:bg-green-600/80 text-white"
              onClick={() =>
                toast("Event has been created", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                  action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                  },
                })
              }
            >
              Success
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-600/80 text-white"
              onClick={() =>
                toast("Event has been created", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                })
              }
            >
              Fail
            </Button>
          </div>

          {/* Edit Quiz */}
          <div className="flex flex-col gap-2">
            <h3 className="sub-text">Create Quiz</h3>
            <Button
              className="bg-green-600 hover:bg-green-600/80 text-white"
              onClick={() =>
                toast("Event has been created", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                })
              }
            >
              Success
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-600/80 text-white"
              onClick={() =>
                toast("Event has been created", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                })
              }
            >
              Fail
            </Button>
          </div>

          {/* Delete Quiz */}
          <div className="flex flex-col gap-2">
            <h3 className="sub-text">Create Quiz</h3>
            <Button
              className="bg-green-600 hover:bg-green-600/80 text-white"
              onClick={() =>
                toast("Event has been created", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                })
              }
            >
              Success
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-600/80 text-white"
              onClick={() =>
                toast("Event has been created", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                })
              }
            >
              Fail
            </Button>
          </div>

          {/* Create Question */}
          <div className="flex flex-col gap-2">
            <h3 className="sub-text">Create Question</h3>
            <Button
              className="bg-green-600 hover:bg-green-600/80 text-white"
              onClick={() =>
                toast("Event has been created", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                })
              }
            >
              Success
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-600/80 text-white"
              onClick={() =>
                toast("Event has been created", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                })
              }
            >
              Fail
            </Button>
          </div>

          {/* Edit Question */}
          <div className="flex flex-col gap-2">
            <h3 className="sub-text">Create Question</h3>
            <Button
              className="bg-green-600 hover:bg-green-600/80 text-white"
              onClick={() =>
                toast("Event has been created", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                })
              }
            >
              Success
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-600/80 text-white"
              onClick={() =>
                toast("Event has been created", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                })
              }
            >
              Fail
            </Button>
          </div>

          {/* Delete Question */}
          <div className="flex flex-col gap-2">
            <h3 className="sub-text">Create Question</h3>
            <Button
              className="bg-green-600 hover:bg-green-600/80 text-white"
              onClick={() =>
                toast("Event has been created", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                })
              }
            >
              Success
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-600/80 text-white"
              onClick={() =>
                toast("Event has been created", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                })
              }
            >
              Fail
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Component;
