export const sidebarLinks = [
	{
		imgURL: "/assets/home.svg",
		route: "/",
		label: "Home",
	},
	{
		imgURL: "/assets/community.svg",
		route: "/community",
		label: "Community",
	},
	{
		imgURL: "/assets/quiz.svg",
		route: "/quizzes",
		label: "Your Quizzes",
	},
	{
		imgURL: "/assets/activites.svg",
		route: "/activities",
		label: "Activites",
	},
	{
		imgURL: "/assets/profile.svg",
		route: "/profile",
		label: "Profile",
	},
];

export const languages: { label: string; value: string }[] = [
	{ label: "English", value: "en" },
	{ label: "Amharic", value: "am" },
	{ label: "Arabic", value: "ar" },
	{ label: "German", value: "de" },
	{ label: "Spanish", value: "es" },
	{ label: "French", value: "fr" },
	{ label: "Hindi", value: "hi" },
	{ label: "Hebrew", value: "he" },
	{ label: "Italian", value: "it" },
	{ label: "Japanese", value: "ja" },
	{ label: "Korean", value: "ko" },
	{ label: "Dutch", value: "nl" },
	{ label: "Portuguese", value: "pt" },
	{ label: "Russian", value: "ru" },
	{ label: "Swahili", value: "sw" },
	{ label: "Thai", value: "th" },
	{ label: "Vietnamese", value: "vi" },
	{ label: "Chinese", value: "zh" },
];

export const ALPHABET_OPTIONS = [
	{ value: "A", index: 0 },
	{ value: "B", index: 1 },
	{ value: "C", index: 2 },
	{ value: "D", index: 3 },
	{ value: "E", index: 4 },
	{ value: "F", index: 5 },
	{ value: "G", index: 6 },
	{ value: "H", index: 7 },
	{ value: "I", index: 8 },
	{ value: "J", index: 9 },
	{ value: "K", index: 10 },
	{ value: "L", index: 11 },
	{ value: "M", index: 12 },
	{ value: "N", index: 13 },
	{ value: "O", index: 14 },
	{ value: "P", index: 15 },
	{ value: "Q", index: 16 },
	{ value: "R", index: 17 },
	{ value: "S", index: 18 },
	{ value: "T", index: 19 },
	{ value: "U", index: 20 },
	{ value: "V", index: 21 },
	{ value: "W", index: 22 },
	{ value: "X", index: 23 },
	{ value: "Y", index: 24 },
	{ value: "Z", index: 25 },
] as const;

export const occuptions: {
	label: string;
	value: string;
}[] = [
	{ label: "Student", value: "student" },
	{ label: "Teacher", value: "teacher" },
	{ label: "Developer", value: "developer" },
	{ label: "Designer", value: "designer" },
	{ label: "Marketer", value: "marketer" },
	{ label: "Manager", value: "manager" },
	{ label: "Writer", value: "writer" },
	{ label: "Other", value: "other" },
];
