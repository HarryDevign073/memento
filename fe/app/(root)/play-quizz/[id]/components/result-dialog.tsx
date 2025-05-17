import { RefreshCcw } from "lucide-react";

import CheckCircle from "@/components/icons/check-circle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { IQuizzResult } from ".";

interface ResultDialogProps {
	open: boolean;
	onClose: () => void;

	quizzResult?: IQuizzResult;

	onRestartGame: () => void;
}

const ResultDialog: React.FC<ResultDialogProps> = ({ open, onClose, quizzResult, onRestartGame }) => {
	if (!quizzResult) return null;

	return (
		<Dialog
			open={open}
			onOpenChange={(val) => {
				if (!val) {
					onClose();
				}
			}}
		>
			<DialogHeader>
				<DialogTitle></DialogTitle>
			</DialogHeader>

			<DialogContent
				className="sm:max-w-[40%]"
				onInteractOutside={(e) => {
					e.preventDefault();
				}}
			>
				<div className="flex flex-col items-center gap-6">
					<CheckCircle />

					<div className="mx-auto text-4xl font-semibold text-neutral-600">Quiz completed</div>

					<div className="mx-auto w-28 bg-violet-500 rounded-lg p-1">
						<span className="text-white text-sm font-medium font-semibold flex justify-center">Your score</span>
						<div className="py-3 w-full rounded-md bg-white text-base font-semibold text-neutral-700 text-center">
							{quizzResult.correct}/{quizzResult.total}
						</div>
					</div>

					<div className="w-full flex px-4 gap-4 mt-2">
						<Button
							variant={"outline"}
							size={"lg"}
							className="text-sm font-medium text-neutral-700 flex-1"
							onClick={onClose}
						>
							Quit
						</Button>
						<Button size={"lg"} className="text-sm font-medium text-white flex-1" onClick={onRestartGame}>
							<RefreshCcw size={20} />
							Restart
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ResultDialog;
