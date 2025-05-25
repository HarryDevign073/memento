"use client";

import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { URLS } from "@/constants/urls";

const Explore = () => {
	const router = useRouter();

	return (
		<Button variant="outline" size="lg" className="text-md font-semibold" onClick={() => router.push(URLS.COMMUNITY)}>
			<Globe size={20} />
			Explore
		</Button>
	);
};

export default Explore;
