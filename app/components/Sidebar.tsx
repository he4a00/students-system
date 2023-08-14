"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "@/constants";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 z-20 h-screen w-fit flex-col justify-between overflow-auto border-r-[#1F1F22] bg-[#1a1c23] pb-5 pt-28 p-10 hidden md:flex">
      <div className="flex w-full flex-col gap-6 px-6">
        {sidebarLinks.map((link: any) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`relative flex justify-start gap-8 rounded-lg p-4 ${
                isActive && "bg-blue-500"
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />

              <p className="text-[#FFFFFF] max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
