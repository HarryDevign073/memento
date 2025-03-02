// import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


async function Community() {

  return (
    <>
      <h1 className='head-text'>Welcome to Memento Community</h1>
      <p className="sub-text">Explore thousands of big idea from others users.</p>

      <section className='mt-9 flex flex-col gap-10'>
        Section
      </section>
    </>
  );
}

export default Community;