// import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

function Community() {
	return (
		<>
			<h1 className="head-text">View your profile</h1>
			<p className="sub-text">Your profile</p>

			<section className="mt-9 flex flex-col gap-10">Section</section>
		</>
	);
}

export default Community;