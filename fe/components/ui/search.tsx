"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
	placeholder?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
}

const Search: React.FC<SearchProps> = ({ placeholder, value, onChange, disabled }) => {
	return (
		<div className="space-y-2 w-full lg:w-[300px]">
			<div className="relative">
				<Input
					id="search-bar"
					className="peer ps-9 disabled:cursor-not-allowed"
					placeholder={placeholder}
					type="search"
					value={value}
					onChange={onChange}
					disabled={disabled}
				/>
				<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
					<SearchIcon size={16} strokeWidth={2} aria-hidden="true" />
				</div>
			</div>
		</div>
	);
};

export default Search;
