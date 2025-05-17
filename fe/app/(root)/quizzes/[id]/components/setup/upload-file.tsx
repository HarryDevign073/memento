import { CloudUpload } from "lucide-react";

import { Label } from "@/components/ui/label";

type UploadFileProps = {
	id: string;
};

const UploadFile: React.FC<UploadFileProps> = ({ id }) => {
	return (
		<Label
			htmlFor={id}
			className="rounded-lg border border-neutral-200 py-5 px-6 w-full flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-neutral-400"
		>
			<div className="w-8 h-8 rounded-md border border-neutral-200 flex items-center justify-center">
				<CloudUpload size={20} className="text-neutral-600" />
			</div>

			<div className="flex gap-1">
				<span className="text-sm font-semibold text-violet-500 leading-none">Click to upload</span>
				<span className="text-xs text-neutral-600 font-normal leading-none">or drag and drop</span>
			</div>

			<div className="text-xs text-neutral-600 font-normal leading-none">PDF (max. 5MB)</div>
		</Label>
	);
};

export default UploadFile;
