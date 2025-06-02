"use client";

import { useUser } from "@/context/user-context";

const fields = [
	{
		label: "First Name",
		key: "first_name",
	},
	{
		label: "Last Name",
		key: "last_name",
	},
	{
		label: "Occupation",
		key: "occupation",
	},
	{
		label: "Total Quizzes",
		key: "total_quizzes",
	},
	{
		label: "Total Questions",
		key: "total_questions",
	},
	{
		label: "Total Liked",
		key: "total_liked",
	},
];

const UserInfo = () => {
	const { currentUser } = useUser();

	const getFieldValue = (field: string): string | number | null | undefined => {
		switch (field) {
			case "first_name":
				return currentUser?.user?.user_first_name;
			case "last_name":
				return currentUser?.user?.user_last_name;
			case "occupation":
				let occupation = currentUser?.user?.user_occupation || "";
				if (occupation) {
					occupation = occupation.charAt(0).toUpperCase() + occupation.slice(1);
					return occupation;
				}
				return "---";
			case "total_quizzes":
				return currentUser?.quizzes?.length;
			case "total_questions":
				const totalQuestions = (currentUser?.quizzes || []).reduce(
					(acc, quiz) => acc + quiz.quiz_questions?.length || 0,
					0
				);
				return totalQuestions;
			case "total_liked":
				const totalLiked = (currentUser?.quizzes || []).reduce((acc, quiz) => acc + quiz.quiz_like_count || 0, 0);
				return totalLiked;
			default:
				return "---";
		}
	};

	return (
		<div className="w-full md:w-[300px] grid grid-cols-3 md:grid-cols-1 gap-3 md:gap-4">
			{fields.map((field) => (
				<div key={field.key} className="h-fit">
					<p className="text-sm text-neutral-500">{field.label}</p>
					<p className="text-base font-medium text-neutral-700">
						{getFieldValue(field.key) == undefined ? "---" : getFieldValue(field.key)}
					</p>
				</div>
			))}
		</div>
	);
};

export default UserInfo;
