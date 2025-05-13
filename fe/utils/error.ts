export const getErrorMessage = (
	error: any
): {
	error: string;
} => {
	const errorMessages = String(error)?.split(":") || [];
	if (errorMessages.length > 0) {
		const errorMessage = errorMessages[errorMessages.length - 1];
		console.info("error login", errorMessage);
		return {
			error: errorMessage,
		};
	}
	return {
		error: "An error occurred",
	};
};