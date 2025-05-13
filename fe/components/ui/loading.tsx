import { Loader2 } from "lucide-react";

const Loading = () => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-neutral-700/40 z-[9999] cursor-default">
			<Loader2 className="w-10 h-10 animate-spin text-neutral-200" />
		</div>
	);
};

export default Loading;