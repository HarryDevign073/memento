"use client";

import { useState } from "react";
import Image from "next/image";

import { Activity } from "@/types/user";

import EmptyList from "@/components/others/EmptyList";

import ActivityItem from "./activity-item";
import Pagination from "../../profile/components/pagination";

import recentView from "@/public/empty/recent-view.png";

const ITEMS_PER_PAGE = 7;
const DEFAULT_PAGE = 1;

interface ActivitiesProps {
	activities: Activity[];
}

const Activities: React.FC<ActivitiesProps> = ({ activities }) => {
	const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);

	const slicedActivities = activities.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

	const renderContent = () => {
		if (activities.length === 0) {
			return (
				<div className="h-fit py-20 flex items-center justify-center">
					<EmptyList
						icon={<Image src={recentView} alt="recent-view" width={270} height={200} />}
						title="No activity yet"
						description="Once you start creating, answering, or sharing quizzes, your activity history will show up here — helping you keep track of your learning journey."
					/>
				</div>
			);
		}

		return (
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
		);
	};

	return (
		<div className="pb-10 flex flex-col gap-9">
			<div>
				<h1 className="head-text">Activities</h1>
				<p className="sub-text">Tracking your activity feeds</p>
			</div>

			{renderContent()}
		</div>
	);
};

export default Activities;
