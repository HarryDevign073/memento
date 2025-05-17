import { Loader2 } from "lucide-react";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmationProps {
	open: boolean;
	setOpen: (open: boolean) => void;

	title?: string;
	description?: string;

	confirmText?: string;

	deleting?: boolean;
	onDelete: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
	onDelete,
	open,
	setOpen,
	title,
	description,
	confirmText,
	deleting,
}) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogHeader>
				<DialogTitle></DialogTitle>
			</DialogHeader>

			<DialogContent
				className="sm:max-w-[30%]"
				onInteractOutside={(e) => {
					e.preventDefault();
				}}
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className="mt-3 flex flex-col gap-2">
					<div className="text-lg font-semibold">{title || "Are you absolutely sure?"}</div>
					<div className="text-sm text-neutral font-normal text-neutral-500">
						{description ||
							"This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
					</div>
				</div>

				<DialogFooter>
					<Button
						variant={"outline"}
						size={"lg"}
						className="text-sm font-medium text-neutral-700 flex-1"
						onClick={() => setOpen(false)}
					>
						Cancel
					</Button>
					<Button
						variant={"destructive"}
						size={"lg"}
						className="text-sm font-medium text-white flex-1"
						onClick={onDelete}
						disabled={deleting}
					>
						{deleting && <Loader2 className="animate-spin" />}
						{confirmText || "Delete"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteConfirmation;
