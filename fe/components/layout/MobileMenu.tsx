"use client";

import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";

const buttonVariants = {
  initial: { gap: 0, paddingLeft: ".5rem", paddingRight: ".5rem" },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

const MobileMenu = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn(
        "md:hidden w-full flex items-center justify-center gap-2 border-t border-neutral-200 bg-background p-3 shadow-sm absolute bottom-0 left-1/2 -translate-x-1/2",
      )}
    >
      {sidebarLinks.map((link) => {
        const isActive =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;

        return (
          <motion.button
            key={link.label}
            variants={buttonVariants}
            initial="initial"
            animate={isActive ? "animate" : "initial"}
            onClick={() => router.push(link.route)}
            transition={transition}
            className={cn(
              "w-fit relative flex items-center justify-center rounded-xl px-4 py-2 gap-2 text-sm font-medium transition-colors duration-300",
              isActive
                ? cn("bg-muted")
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {/* Render Icon */}
            <Image src={link.imgURL} alt={link.label} width={20} height={20} />

            <AnimatePresence initial={false}>
              {isActive && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="ml-2"
                >
                  {link.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
};

export default MobileMenu;
