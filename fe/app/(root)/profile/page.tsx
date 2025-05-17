import Banner from "./components/banner";
import Collections from "./components/collections";
import UserInfo from "./components/user-info";

const ViewProfile = () => {
	return (
		<>
			<div className="px-5 pt-5">
				<h1 className="head-text">View your profile</h1>
				<p className="sub-text">Your profile</p>
			</div>

			<section className="mt-4 flex flex-col gap-10 pb-10 bg-white">
				<Banner />

				<div className="flex flex-col md:flex-row gap-10 mt-32 px-10">
					<UserInfo />

					<div className="flex-1">
						<Collections />
					</div>
				</div>
			</section>
		</>
	);
};

export default ViewProfile;
