"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
  },
  {
    name: "Categories",
    href: "/dashboard/categories",
  },
  {
    name: "Products",
    href: "/dashboard/products",
  },
  {
    name: "Banner Picture",
    href: "/dashboard/banner",
  },
];

export function DashboardNavigation() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "relative transition-all group p-2 font-[600] hover:text-primary",
            pathname === link.href ? "text-primary" : ""
          )}
        >
          {link.name}
          <span
            className={cn(
              "absolute left-2 bottom-[-2px] h-[3px] w-[0%] bg-primary transition-all duration-300  rounded-lg",
              pathname === link.href ? "w-[30%]" : "w-[0%]"
            )}
          />
        </Link>
      ))}
    </>
  );
}
