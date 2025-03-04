// import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function Community() {
  return (
    <>
      <h1 className="head-text">Welcome to Memento Community</h1>
      <p className="sub-text">
        Explore thousands of big idea from others users.
      </p>

      <section className="mt-9 flex flex-col gap-10">
        <Tabs defaultValue="all" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="favorite">Favorite</TabsTrigger>
          </TabsList>
          <TabsContent value="all">All </TabsContent>
          <TabsContent value="favorite">Favorite</TabsContent>
        </Tabs>
      </section>
    </>
  );
}

export default Community;
