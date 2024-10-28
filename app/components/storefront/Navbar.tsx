import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBagIcon } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import { CategoriesNavigation } from "./categories-navigation";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-navigation";
import { getCart, getGuestCartt } from "@/lib/cart";
import Image from "next/image";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  let cart;

  if (!user) {
    cart = await getGuestCartt();
  } else {
    cart = await getCart();
  }
  const total = cart?.items.length || 0;
  return (
    <nav className="w-full h-[80px] top-0 z-50  fixed   py-5 flex items-center justify-between  shadow-lg  bg-[#e3e6f3] ">
      <div className="flex items-center ">
        <Link
          href="/"
          className="md:w-[180px] md:h-[180px] w-[120px] h-[120px] flex"
        >
          <Image
            src={"/men.jpeg"}
            alt={"Logo"}
            width={200}
            height={200}
            className="object-contain md:scale-[1.12] scale-[1.5]"
          />
        </Link>
        <NavbarLinks />
        <CategoriesNavigation />
      </div>

      <div className=" items-center text-gray-700 gap-x-2 flex md:pr-7">
        {isAdmin && (
          <Link
            href={`/dashboard`}
            className={cn(
              "relative transition-all group p-2 font-[600] hover:text-primary  hidden md:flex "
            )}
          >
            Dashboard
          </Link>
        )}

        <Link
          href="/bag"
          className="group p-2  items-center mr-2 text-gray-700 relative  hidden md:flex "
        >
          <ShoppingBagIcon className="h-6 w-6  group-hover:text-gray-500" />
          <span className="left-8 text-sm font-medium absolute text-gray-800 group-hover:text-gray-800 -top-1  ">
            {total}
          </span>
        </Link>
        {user ? (
          <UserDropdown
            email={user.email as string}
            name={user.given_name as string}
            userImage={user.picture}
          />
        ) : (
          <div className="flex md:flex-1 md:items-center md:justify-end ">
            <Button variant="ghost" asChild className="">
              <LoginLink className="hover:bg-slate-300/50 underline text-base">
                Sign in
              </LoginLink>
            </Button>

            <Button variant="ghost" asChild className="hidden md:flex">
              <RegisterLink className="hover:bg-slate-300/50">
                Create Account
              </RegisterLink>
            </Button>
          </div>
        )}
      </div>
      <MobileNav user={user} isAdmin={isAdmin} total={total} />
    </nav>
  );
}
