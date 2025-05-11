import { ChangeEvent, forwardRef } from "react";
import { Check } from "lucide-react";
import Image from "next/image";

import { Input } from "../ui/input";

import { cn } from "@/lib/utils";

type Props = {
	id: string;
	className?: string;
	label: string;
	value: string;
	description: string;
	icon?: string;
	checked: boolean;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Radio: React.FC<Props> = ({ label, description, icon, value, checked, id, onChange, className }) => {
	return (
		<div className="relative">
			<Input type="radio" id={id} className="hidden peer" value={value} checked={checked} onChange={onChange} />

			<label
				htmlFor={id}
				className={cn(
					"relative flex gap-3 p-3 border border-neutral-200 rounded-lg items-start peer-checked:outline-2 peer-checked:outline-[#7F56D9] cursor-pointer",
					className
				)}
			>
				{icon && <Image src={icon} alt="Multiple Type" />}

				<div className="flex flex-col">
					<div className="text-neutral-700 text-sm font-medium leading-5">{label}</div>
					<div className="self-stretch text-neutral-600 text-sm font-normal leading-5">{description}</div>
				</div>
			</label>
			<div className="flex items-center justify-center absolute top-2 right-2 w-5 h-5 bg-[#7F56D9] rounded-full scale-0 peer-checked:scale-100 transition delay-100">
				<Check size={"12"} color="white" />
			</div>
		</div>
	);
};

export default Radio;