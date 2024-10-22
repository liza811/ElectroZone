"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import { Menu, MenuIcon, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

import { navbarLinks } from "./NavbarLinks";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserDropdown } from "./UserDropdown";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export const MobileNav = ({
  user,
  isAdmin,
  total,
}: {
  user: KindeUser | null;
  isAdmin: boolean;
  total: number;
}) => {
  const location = usePathname();

  return (
    <Sheet>
      <SheetTrigger className="md:hidden  pr-4 transition hover:opacity-75">
        <Menu />
      </SheetTrigger>
      <SheetContent side={"right"} className="p-0 bg-neutral-100 border-none">
        <nav
          className={`absolute xl:hidden py-10 px-3 left-0 text-start w-[100%] mx-auto rounded-md bg-neutral-100 flex  justify-start flex-col items-start gap-6 transition-transform 
          
        `}
        >
          <div className="flex flex-col md:hidden  ">
            {navbarLinks.map((item) => (
              <Link
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
            <Link
              href="/bag"
              className=" p-2 flex items-center mt-3 text-gray-700 "
            >
              <span className="relative transition-all group -mt-3 font-[600] hover:text-primary">
                Cart {total}
              </span>
            </Link>
            {isAdmin && (
              <Link
                href={`/dashboard`}
                className={cn(
                  " p-2 flex items-center mt- text-gray-700 relative transition-all group  font-[600] hover:text-primary"
                )}
              >
                Dashboard
              </Link>
            )}
            {/* {user ? (
              <UserDropdown
                email={user.email as string}
                name={user.given_name as string}
                userImage={user.picture}
              />
            ) : (
              <Button
                variant="ghost"
                asChild
                className="hover:bg-transparent text-[15px]  font-[600] hover:text-primary flex justify-start text-black"
              >
                <LoginLink className="hover:bg-transparent ml-4 font-[600] hover:text-primary">
                  Sign in
                </LoginLink>
              </Button>
            )} */}
          </div>
          {/* <div className=" items-center text-gray-700 gap-x-2 -mt-5">
            {!user && (
              <div className=" flex flex-col  space-x-2 text-start">
                <Button
                  variant="ghost"
                  asChild
                  className="hover:bg-transparent text-[15px]  font-[600] hover:text-primary flex justify-start text-black"
                >
                  <LoginLink className="hover:bg-transparent ml-4 font-[600] hover:text-primary">
                    Sign in
                  </LoginLink>
                </Button>

                <Button
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
          </div> */}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
