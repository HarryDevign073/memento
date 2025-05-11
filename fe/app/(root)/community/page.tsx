// import { currentUser } from "@clerk/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Search from "@/components/ui/search";
import { communityItem } from "@/constants";
import ListQuizItem from "@/components/feature/ListQuizItem";
import { LayoutGrid, List } from "lucide-react";
import CardQuizItem from "@/components/feature/CardQuizItem";

function Community() {
	return (
		<section className="w-full flex flex-col justify-center items-center">
			{/* Title and Search bar */}
			<div className="w-full flex flex-col justify-between items-center">
				<h1 className="head-text">Welcome to Memento Community</h1>
				<p className="sub-text">Explore thousands of big idea from others users.</p>
				{/* <div className="max-w-[60%] pt-6">
          <Search placeholder="Search by quiz name" />
        </div> */}
			</div>

			<Tabs defaultValue="grid" className="w-full mt-9">
				<div className="flex lg:flex-row flex-col-reverse items-start gap-3 justify-between lg:items-center w-full">
					<div className="flex w-full justify-start items-center gap-2">
						{/* <Input type="search" placeholder="Search..." className="min-w-[320px]" /> */}
						<Search placeholder="Search by quiz name" />
					</div>
					<TabsList>
						<TabsTrigger value="grid" className="h-10">
							<LayoutGrid />
						</TabsTrigger>
						<TabsTrigger value="list" className="h-10">
							<List />
						</TabsTrigger>
					</TabsList>
				</div>
				<TabsContent value="grid">
					<div className="mt-3 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3 w-full">
						{communityItem.map((item) => (
							<CardQuizItem
								key={item.id}
								quizTitle={item.quizTitle}
								quizDesc={item.quizDesc}
								questionCount={item.questionCount}
								likeCount={item.likeCount}
								playCount={item.playCount}
								isActive={item.isActive}
								authorName={item.authorName}
								authorNameAbbre={item.authorNameAbbre}
								authorQuizCount={item.authorQuizCount}
								authorLikeCount={item.authorLikeCount}
								occupation={item.occupation}
								state={item.state}
							/>
						))}
					</div>
				</TabsContent>
				<TabsContent value="list">
					<div className="flex flex-col mt-3 gap-3 ">
						{communityItem.map((item) => (
							<ListQuizItem
								key={item.id}
								quizId={item.id}
								quizTitle={item.quizTitle}
								quizDesc={item.quizDesc}
								questionCount={item.questionCount}
								likeCount={item.likeCount}
								playCount={item.playCount}
								isActive={item.isActive}
								authorName={item.authorName}
								authorNameAbbre={item.authorNameAbbre}
								authorQuizCount={item.authorQuizCount}
								authorLikeCount={item.authorLikeCount}
								occupation={item.occupation}
								state={item.state}
							/>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</section>
	);
}

export default Community;