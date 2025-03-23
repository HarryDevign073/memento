// import { currentUser } from "@clerk/nextjs";
import AnimatedLoading from "@/components/AnimatedLoading";
import { redirect } from "next/navigation";


async function Community() {

  return (
    <>
      <h1 className='head-text'>Tracking your activities</h1>
      <p className="sub-text">Tracking your activity feeds</p>

      <section className='mt-9 flex flex-col gap-10'>
        <AnimatedLoading />
      </section>
    </>
  );
}

export default Community;