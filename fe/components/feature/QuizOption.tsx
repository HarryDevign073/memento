"use client";

import { useState } from "react";
import { Download, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/context/toast-context";

import { deleteQuizz } from "@/actions/quizz";

import { CreateQuizzRequest } from "@/types/quizz";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import DeleteConfirmation from "./Dialog/DeleteConfirmation";
import UpsertQuizzDialog from "./Dialog/UpsertQuizzDialog";

import { handleHttpResponse } from "@/utils/http";
import { refetchQuizz } from "@/utils/quizz";

interface QuizOptionProps {
	quizId: number;
	quizz?: CreateQuizzRequest;
	editable?: boolean;

	disabledExport?: boolean;
	exportQuizz?: () => void;
}

const QuizOption: React.FC<QuizOptionProps> = ({ quizId, quizz, editable, disabledExport, exportQuizz }) => {
	const { setToast } = useToast();
	const queryClient = useQueryClient();

	const [deleteDialogActive, setDeleteDialogActive] = useState<boolean>(false);
	const [quizEditForm, setQuizEditForm] = useState<CreateQuizzRequest | undefined>(undefined);
	const [deleting, setDeleting] = useState<boolean>(false);

	if (!editable) return null;

	const onDelete = async () => {
		try {
			setDeleting(true);
			const res = await deleteQuizz(quizId);

			handleHttpResponse({
				response: res,
				successState: {
					message: "Quiz deleted successfully",
				},
				errorState: {
					message: "Failed to delete quiz",
				},
				setToast,
				callback: async () => {
					setDeleteDialogActive(false);
					await refetchQuizz(queryClient);
				},
			});
		} catch (error) {
			console.error("Failed to delete quiz", error);
		} finally {
			setDeleting(false);
		}
	};

	return (
		<>
			<DropdownMenu modal={true}>
				<DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<MoreHorizontal />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem
						onClick={(e) => {
							e.stopPropagation();
							if (quizz) {
								setQuizEditForm(quizz);
							}
						}}
					>
						<Edit />
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={(e) => {
							e.stopPropagation();
							exportQuizz && exportQuizz();
						}}
						disabled={disabledExport}
					>
						<Download />
						Export
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={(e) => {
							e.stopPropagation();
						}}
					>
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
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<DeleteConfirmation
				open={deleteDialogActive}
				setOpen={setDeleteDialogActive}
				deleting={deleting}
				onDelete={onDelete}
				title="Delete this quiz ?"
				description="This action cannot be undone. All questions in this quiz will be permanently deleted."
			/>

			<Dialog open={!!quizEditForm} onOpenChange={(val) => !val && setQuizEditForm(undefined)}>
				<DialogContent
					className="sm:max-w-[60%]"
					onInteractOutside={(e) => {
						e.preventDefault();
					}}
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<UpsertQuizzDialog quizz={quizEditForm} quizId={quizId} onCloseDialog={() => setQuizEditForm(undefined)} />
				</DialogContent>
			</Dialog>
		</>
	);
};

export default QuizOption;
