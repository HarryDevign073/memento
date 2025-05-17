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
} from "../../ui/alert-dialog";

interface DeleteConfirmationProps {
	open: boolean;
	setOpen: (open: boolean) => void;

	title?: string;
	description?: string;

	confirmText?: string;

	triggeredElement: React.ReactNode;
	onDelete: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
	triggeredElement,
	onDelete,
	open,
	setOpen,
	title,
	description,
	confirmText,
}) => {
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>{triggeredElement}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title || "Are you absolutely sure?"}</AlertDialogTitle>
					<AlertDialogDescription>
						{description ||
							"This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onDelete}>{confirmText || "Delete"}</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteConfirmation;
