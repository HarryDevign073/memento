import { RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface QuizzActionProps {
	onQuit: () => void;
	onRestart: () => void;
}

const QuizzAction: React.FC<QuizzActionProps> = ({ onQuit, onRestart }) => {
	return (
		<div className="w-full flex gap-4 mt-2 justify-end">
			<Button variant={"outline"} size={"lg"} className="text-sm font-medium text-neutral-700" onClick={onQuit}>
				Quit
			</Button>
			<Button size={"lg"} className="text-sm font-medium text-white" onClick={onRestart}>
				<RefreshCcw size={20} />
				Restart
			</Button>
		</div>
	);
};

export default QuizzAction;
