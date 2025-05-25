"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import BookOutline from "@/components/icons/book-outline";

import { URLS } from "@/constants/urls";

const NewQuiz = () => {
	const router = useRouter();
	return (
		<Button
			size="lg"
			className="text-md font-semibold"
			onClick={() => router.push(`${URLS.QUIZZES}?previous_path=home`)}
		>
			<BookOutline size={20} />
			New Quiz
		</Button>
	);
};

export default NewQuiz;
