"use client";

import { useState } from "react";

import { Activity } from "@/types/user";

import ActivityItem from "./activity-item";
import Pagination from "../../profile/components/pagination";

const ITEMS_PER_PAGE = 7;
const DEFAULT_PAGE = 1;

interface ActivitiesProps {
	activities: Activity[];
}

const Activities: React.FC<ActivitiesProps> = ({ activities }) => {
	const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);

	const slicedActivities = activities.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

	return (
		<div className="pb-10 flex flex-col gap-9">
			<div>
				<h1 className="head-text">Activities</h1>
				<p className="sub-text">Tracking your activity feeds</p>
			</div>

			<div className="flex flex-col gap-3">
				<section className="w-full flex flex-col bg-white p-4 rounded-lg border border-neutral-100">
					{slicedActivities.map((activity, index) => (
						<ActivityItem
							key={activity.id}
							activity={activity}
							isLastItem={index === slicedActivities.length - 1}
							isFirstItem={index === 0}
						/>
					))}
				</section>

				<Pagination
					totalPages={Math.ceil((activities as Activity[]).length / ITEMS_PER_PAGE)}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
				/>
			</div>
		</div>
	);
};

export default Activities;
