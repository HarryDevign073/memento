// import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";
import Search from "@/components/ui/search";

async function Community() {
  return (
    <>
      <h1 className="head-text">Your collections</h1>
      <p className="sub-text">
        Separate your questions into suitable categories
      </p>

      <section className="mt-9 flex flex-col gap-10 h-screen">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between items-center w-full">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="public">Public</TabsTrigger>
              <TabsTrigger value="private">Private</TabsTrigger>
              <TabsTrigger value="archive">Archive</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              {/* <Input type="search" placeholder="Search..." className="min-w-[320px]" /> */}
              <Search />
              <Button size={"lg"}>
                <FolderPlus /> New Collection
              </Button>
            </div>
          </div>
          <TabsContent value="all">All</TabsContent>
          <TabsContent value="public">Public</TabsContent>
          <TabsContent value="private">Private</TabsContent>
          <TabsContent value="archive">Archive</TabsContent>
        </Tabs>
      </section>
    </>
  );
}

export default Community;
