import { FileQuestion } from "lucide-react";

import { Question } from "@/types/quizz";

type Props = {
	isEdit: boolean;
	questions: Question[];
};

const QuestionHeader: React.FC<Props> = ({ isEdit, questions }) => {
	return (
		<div className="flex flex-col md:flex-row items-start justify-start md:items-end md:justify-between gap-3 pb-4 border-b border-neutral-200">
			<div className="flex flex-col">
				<span className="font-semibold text-lg text-neutral-900">
					{!isEdit ? "Your result" : "Start creating your questions"}
				</span>
				<span className="text-sm text-neutral-600">{!isEdit ? "Question type: Manual" : "Description"}</span>
			</div>
			<div className="flex items-center gap-2 w-fit rounded-md border border-neutral-200 px-3 py-2">
				<FileQuestion size={20} className="text-neutral-600" />
				<span className="text-sm text-neutral-600">{(questions ?? []).length}</span>
			</div>
		</div>
	);
};

export default QuestionHeader;