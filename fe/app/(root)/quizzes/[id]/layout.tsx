import { Suspense } from "react";

interface Props {
	children: React.ReactNode;
	params: {
		id: string;
	};
}

export default async function QuizLayout({ children, params }: Props) {
	const { id } = await params;

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div className="w-full h-full">{children}</div>
		</Suspense>
	);
}