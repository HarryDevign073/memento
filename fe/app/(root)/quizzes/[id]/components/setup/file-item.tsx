import { Trash2 } from "lucide-react";

import PdfIcon from "@/components/icons/pdf";

type FileItemProps = {
	file: File;

	onRemove: () => void;
};

const FileItem: React.FC<FileItemProps> = ({ file, onRemove }) => {
	return (
		<div className="rounded-lg border border-neutral-200 py-5 px-6 w-full flex gap-3">
			<div className="flex items-center gap-2 flex-1">
				<PdfIcon />
				<div className="flex flex-col gap-1">
					<span className="text-sm font-semibold text-violet-500 leading-none line-clamp-1">{file.name}</span>
					<span className="text-xs text-neutral-600 font-normal leading-none">{(file.size / 1024).toFixed(2)} KB</span>
				</div>
			</div>

			<button className="ml-auto border-0 outline-none cursor-pointer" onClick={onRemove}>
				<Trash2 size={20} className="text-red-600 hover:text-red-400" />
			</button>
		</div>
	);
};

export default FileItem;
