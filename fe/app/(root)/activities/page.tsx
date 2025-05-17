"use server";


import { cache } from "react";

import { getActivities } from "@/actions/user";

import { HttpResponse } from "@/types/http";
import { Activity } from "@/types/user";

import Activities from "./components";

const getCachedActivities = cache(async () => {
	const activities = await getActivities();

	let formatActivities: Activity[] = [];

	if ((activities as HttpResponse)?.error) {
		formatActivities = [];
	} else {
		formatActivities = activities as Activity[];
	}
  
	return formatActivities;
});

const ActivitiesContainer = async () => {
	const activities = await getCachedActivities();

	return <Activities activities={activities} />;
};

export default ActivitiesContainer;
