import { useState } from "react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import DeleteConfirmation from "./Dialog/DeleteConfirmation";

interface QuizOptionProps {
	editable?: boolean;
}

const QuizOption: React.FC<QuizOptionProps> = ({ editable }) => {
	const [deleteDialogActive, setDeleteDialogActive] = useState<boolean>(false);

	if (!editable) return null;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<MoreHorizontal />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem>
					<Edit />
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem>
					<DeleteConfirmation
						open={deleteDialogActive}
						setOpen={setDeleteDialogActive}
						triggeredElement={
							<button
								className="flex items-center gap-2"
								onClick={(e) => {
									e.stopPropagation();
									setDeleteDialogActive(true);
								}}
							>
								<Trash color="red" />
								<span className="text-red-500">Delete</span>
							</button>
						}
						onDelete={() => {}}
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default QuizOption;
