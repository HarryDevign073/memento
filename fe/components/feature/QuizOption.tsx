import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

interface QuizOptionProps {
	editable?: boolean;
}

const QuizOption: React.FC<QuizOptionProps> = ({ editable }) => {
	if (!editable) return null;

	return (
		<div className="flex items-center gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
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
						<Trash color="red" />
						<span className="text-red-500">Delete</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default QuizOption;
