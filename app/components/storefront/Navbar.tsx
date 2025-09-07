import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Heart, ShoppingBagIcon, ShoppingCart, User } from "lucide-react";
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
import { SearchMobile } from "./search-mobile";
import { fetchAllCategories } from "@/lib/categories";

export async function Navbar() {
  const { getUser, getPermission } = getKindeServerSession();
  const user = await getUser();
  const categories = await fetchAllCategories();
  const permission = await getPermission("dashboard");

  const isAdmin = permission?.isGranted ? true : false;

  let cart;

  if (!user) {
    cart = await getGuestCartt();
  } else {
    cart = await getCart();
  }
  const total = cart?.items.length || 0;
  return (
    <nav className="w-full h-[80px] top-0 z-50  fixed   py-5 flex items-center justify-between  shadow-lg  bg-white">
      <div className="flex items-center ">
        <Link
  href="/"
  className=" flex items-center justify-center "
>
  <span className="text-2xl  font-extrabold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent tracking-wide drop-shadow-lg">
    Electro<span className="text-black">Zone</span>
  </span>
</Link>

        <NavbarLinks />
        <CategoriesNavigation />
      </div>

      <div className=" items-center text-gray-700  gap-x-4 flex lg:pr-7 ml-auto">
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
          className="group  items-center  text-gray-700 relative  hidden md:flex "
        >
          <ShoppingCart className="size-6 group-hover:text-gray-500" />
          <span className="left-6 text-sm font-medium absolute text-gray-800 group-hover:text-gray-800 -top-2  ">
            {total}
          </span>
        </Link>
        <Link
          href="/whishlist"
          className="group  items-center  text-gray-700 md:-mr-3 flex "
        >
          <Heart className="size-6 group-hover:text-gray-500" />
        </Link>

        <SearchMobile categories={categories} />
        {user ? (
          <UserDropdown
            email={user.email as string}
            name={user.given_name as string}
            userImage={user.picture}
          />
        ) : (
          <div className="flex md:items-center md:justify-end ">
            <Button
              variant="ghost"
              size={"icon"}
              asChild
              className=" p-0 bg-transparent m-0 "
            >
              <LoginLink className="hover:bg-slate-300/50  ">
                <User className="size-6 " />
              </LoginLink>
            </Button>
          </div>
        )}
      </div>
      <MobileNav user={user} isAdmin={isAdmin} total={total} />
    </nav>
  );
}
