import { cn } from "@/lib/utils";

export interface ITabItem {
	label: string;
	value: string;
}

interface CustomTabsProps {
	tabs: ITabItem[];
	selectedTab: string;
	setSelectedTab: (tab: string) => void;
	isLoading: boolean;
}

const CustomTabs: React.FC<CustomTabsProps> = ({ tabs, selectedTab, setSelectedTab, isLoading }) => {
	return (
		<div className="bg-muted text-muted-foreground inline-flex h-12 w-fit items-center justify-center rounded-lg p-1">
			{tabs.map((tab) => (
				<button
					key={tab.value}
					className={cn(
						"capitalize focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex items-center justify-center gap-1.5 rounded-md px-4 py-2 text-md font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:cursor-not-allowed cursor-pointer disabled:opacity-50 capitalize",
						selectedTab === tab.value && "bg-background text-foreground shadow-sm"
					)}
					onClick={() => setSelectedTab(tab.value)}
					disabled={isLoading}
				>
					{tab.label}
				</button>
			))}
		</div>
	);
};

export default CustomTabs;
