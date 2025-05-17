import GlobalLoading from "@/app/loading";
import { Suspense } from "react";

interface Props {
	children: React.ReactNode;
	params: {
		id: string;
	};
}

export default async function QuizLayout({ children }: Props) {
	return (
		<Suspense fallback={<GlobalLoading />}>
			<div className="w-full h-full">{children}</div>
		</Suspense>
	);
}
