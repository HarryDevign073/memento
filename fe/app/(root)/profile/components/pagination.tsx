import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";

interface CollectionsPaginationProps {
	totalPages: number;
	currentPage: number;
	onPageChange: (page: number) => void;
}

const CollectionsPagination: React.FC<CollectionsPaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
	const handlePageChange = (page: number) => {
		onPageChange(page);
	};

	return (
		<div className="flex gap-6 items-center">
			<Pagination>
				<PaginationContent className="flex items-center gap-5">
					<PaginationItem>
						<button
							className="flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-neutral-600"
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
						>
							<ChevronLeft size={18} />
							<span>Previous</span>
						</button>
					</PaginationItem>
					<PaginationItem className="flex items-center gap-1">
						<Button
							variant="outline"
							className="flex items-center gap-1 text-sm text-neutral-600 hover:bg-white hover:!cursor-default"
						>
							{currentPage}
						</Button>
					</PaginationItem>
					<PaginationItem>
						<button
							className="flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-neutral-600"
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
						>
							<span>Next</span>
							<ChevronRight size={18} />
						</button>
					</PaginationItem>
				</PaginationContent>
			</Pagination>

			<span className="text-sm font-normal text-neutral-500">
				{currentPage}/{totalPages}
			</span>
		</div>
	);
};

export default CollectionsPagination;
