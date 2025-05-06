"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "../public/assets/logo.svg";

import { sidebarLinks } from "@/fe/constants";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="custom-scrollbar w-[260px] bg-white py-8 px-4 md:flex flex-col gap-6 hidden">
      <Image src={logo} alt="logo" />
      <div className="flex w-full flex-1 flex-col gap-1">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          //   if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`flex gap-2 px-3 py-2 rounded-md hover:bg-neutral-50 ${
                isActive && "bg-neutral-50"
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />

              <p
                className={`text-neutral-600 text-base leading-6 ${
                  isActive && "font-medium text-neutral-800"
                }`}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
