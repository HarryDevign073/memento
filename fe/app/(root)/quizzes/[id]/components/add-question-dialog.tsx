import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { QuestionType } from "@/types/quizz";

type Props = {
	open: boolean;
	onClose: (open: boolean) => void;
	questionType: QuestionType;
	setQuestionType: (type: QuestionType) => void;
	onAddQuestion: () => void;
};

const AddQuestionDialog: React.FC<Props> = ({ open, onClose, questionType, setQuestionType, onAddQuestion }) => {
	return (
		<div className="flex items-center gap-3 ">
			<div className="flex-1 h-[1px] bg-neutral-200"></div>

			<Dialog open={open} onOpenChange={onClose}>
				<DialogTrigger asChild>
					<Button variant={"outline"} className="cursor-pointer">
						<Plus size={20} /> Add
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[40%]">
					<DialogHeader>
						<DialogTitle>Select your question type</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col gap-2 mt-3">
						<RadioGroup
							value={questionType}
							onValueChange={(value) => {
								setQuestionType(value as QuestionType);
							}}
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="true_false" id="true_false" />
								<Label htmlFor="true_false" className="text-sm font-normal text-neutral-600">
									True or false
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="multiple_choice" id="multiple_choice" />
								<Label htmlFor="multiple_choice" className="text-sm font-normal text-neutral-600">
									Multiple choice
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="fill_in_the_blank" id="fill_in_the_blank" />
								<Label htmlFor="fill_in_the_blank" className="text-sm font-normal text-neutral-600">
									Fill in the blank
								</Label>
							</div>
						</RadioGroup>
					</div>

					<Button className="w-full mt-4 cursor-pointer" onClick={onAddQuestion}>
						Submit
					</Button>
				</DialogContent>
			</Dialog>

			<div className="flex-1 h-[1px] bg-neutral-200"></div>
		</div>
	);
};

export default AddQuestionDialog;