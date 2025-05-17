import { Activity } from "@/types/user";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { getTimeAgo } from "@/utils/date";
import { cn } from "@/lib/utils";

interface ActivityItemProps {
	activity: Activity;
	isLastItem?: boolean;
	isFirstItem?: boolean;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity, isLastItem, isFirstItem }) => {
	const getActivityType = (activityType: string): string => {
		switch (activityType) {
			case "liked_quiz":
				return "Liked quiz";
			case "updated_quiz":
				return "Updated quiz";
			case "added_favorite":
				return "Added favorite";
			case "created_quiz":
				return "Created quiz";
			default:
				const formatActivityType = activityType.split("_").join(" ");
				return formatActivityType.charAt(0).toUpperCase() + formatActivityType.slice(1);
		}
	};

	return (
		<div
			className={cn(
				"flex items-center w-full justify-between border-b-1 border-neutral-200",
				isLastItem ? "border-b-0 pb-0" : "pb-3",
				isFirstItem ? "pt-0" : "pt-3"
			)}
		>
			<div className="flex items-center gap-4">
				<Avatar className="w-10 h-10">
					<AvatarImage src="https://github.com/shadcn.png" />
				</Avatar>
				<div className="flex flex-col gap-1">
					<div className="flex gap-2">
						<div className="text-neutral-700 text-sm font-medium ">{activity.user?.user_full_name}</div>
						<div className="text-neutral-600 text-xs font-normal">{getTimeAgo(activity.created_at)}</div>
					</div>
					<div className="flex gap-1">
						<div className="text-neutral-600 text-sm font-normal">{getActivityType(activity.activity_type)}</div>
						<div className="text-violet-500 text-sm font-medium">{activity.activity.quiz_name}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ActivityItem;
