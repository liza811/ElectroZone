"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { MenuIcon, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { navbarLinks } from "./NavbarLinks";
import { usePathname } from "next/navigation";

export const MobileNav = ({
  user,
  isAdmin,
  total,
}: {
  user: boolean;
  isAdmin: boolean;
  total: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = usePathname();
  return (
    <>
      <Button
        className=" hover:bg-neutral-100 block md:hidden"
        variant={"ghost"}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon className="size-6 text-black" />
      </Button>
      <nav
        className={`absolute xl:hidden top-24 left-0 text-start w-[70%] mx-auto rounded-md bg-neutral-100 flex  justify-start flex-col items-center gap-6 transition-transform ${
          isOpen ? "opaciity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col md:hidden  ">
          {navbarLinks.map((item) => (
            <Link
              onClick={() => setIsOpen(!isOpen)}
              href={item.href}
              key={item.id}
              className={cn(
                " transition-all group p-2 font-[600] hover:text-primary",
                location === item.href ? "text-primary" : ""
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className=" items-center text-gray-700 gap-x-2 -mt-5">
          {isAdmin && (
            <Link
              onClick={() => setIsOpen(!isOpen)}
              href={`/dashboard`}
              className={cn(
                " transition-all group -mt-3 font-[600] hover:text-primary"
              )}
            >
              Dashboard
            </Link>
          )}
          {user ? (
            <>
              <Link
                onClick={() => setIsOpen(!isOpen)}
                href="/bag"
                className=" p-2 flex items-center mt-3 text-gray-700 "
              >
                <span className="relative transition-all group -mt-3 font-[600] hover:text-primary">
                  Cart {total}
                </span>
              </Link>

              {/* <UserDropdown
                email={user.email as string}
                name={user.given_name as string}
                userImage={user.picture}
              /> */}
            </>
          ) : (
            <div className=" flex flex-col  space-x-2 text-start">
              <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="ghost"
                asChild
                className="hover:bg-transparent text-[15px]  font-[600] hover:text-primary flex justify-start text-black"
              >
                <LoginLink className="hover:bg-transparent ml-4 font-[600] hover:text-primary">
                  Sign in
                </LoginLink>
              </Button>

              <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="ghost"
                asChild
                className="hover:bg-transparent text-[15px]  font-[600] hover:text-primary flex justify-start text-black"
              >
                <RegisterLink className="hover:bg-transparent ml-4 font-[600] hover:text-primary">
                  Create Account
                </RegisterLink>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
