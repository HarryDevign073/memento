export const getTimeAgo = (date: string): string => {
	const now = new Date();
	const then = new Date(date);
	const diff = now.getTime() - then.getTime();
	const diffInMinutes = Math.floor(diff / (1000 * 60));
	const diffInHours = Math.floor(diffInMinutes / 60);
	const diffInDays = Math.floor(diffInHours / 24);

	if (diffInDays > 0) {
		return `${diffInDays} days ago`;
	} else if (diffInHours > 0) {
		return `${diffInHours} hours ago`;
	} else if (diffInMinutes > 0) {
		return `${diffInMinutes} minutes ago`;
	}

	return "Just now";
};
