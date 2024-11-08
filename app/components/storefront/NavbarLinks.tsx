"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navbarLinks = [
  {
    id: 0,
    name: "Home",
    href: "/",
  },
  {
    id: 1,
    name: "All Products",
    href: "/products/all",
  },
];

export function NavbarLinks() {
  const location = usePathname();
  return (
    <div className="hidden md:flex justify-center items-center gap-x-2 -ml-5 lg:-ml-0 min-w-fit">
      {navbarLinks.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className={cn(
            "relative transition-all group p-2 font-[600] hover:text-primary text-nowrap",
            location === item.href ? "text-primary" : ""
          )}
        >
          {item.name}
          <span
            className={cn(
              "absolute left-2 bottom-[-2px] h-[3px] w-[0%] bg-primary transition-all duration-300  rounded-lg",
              location === item.href ? "w-[30%]" : "w-[0%]"
            )}
          />
        </Link>
      ))}
    </div>
  );
}
