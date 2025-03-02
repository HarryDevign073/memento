// import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


async function Community() {

  return (
    <>
      <h1 className='head-text'>Your collections</h1>
      <p className="sub-text">Separate your questions into suitable categories</p>

      <section className='mt-9 flex flex-col gap-10'>
        Section
      </section>
    </>
  );
}

export default Community;