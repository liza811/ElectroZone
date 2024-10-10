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
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/lib/interfaces";
import { CategoriesNavigation } from "./categories-navigation";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-navigation";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);
  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="w-full h-[80px] top-0 z-50  fixed px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between  shadow-lg  bg-[#e3e6f3] ">
      <div className="flex items-center">
        <Link href="/">
          <h1 className="text-black font-bold text-xl lg:text-3xl">
            Electro<span className="text-primary">Zone</span>
          </h1>
        </Link>
        <NavbarLinks />
        <CategoriesNavigation />
      </div>

      <div className=" items-center text-gray-700 gap-x-2 hidden md:flex">
        {isAdmin && (
          <Link
            href={`/dashboard`}
            className={cn(
              "relative transition-all group p-2 font-[600] hover:text-primary"
            )}
          >
            Dashboard
          </Link>
        )}
        {user ? (
          <>
            <Link
              href="/bag"
              className="group p-2 flex items-center mr-2 text-gray-700 relative"
            >
              <ShoppingBagIcon className="h-6 w-6  group-hover:text-gray-500" />
              <span className="left-8 text-sm font-medium absolute text-gray-800 group-hover:text-gray-800 -top-1  ">
                {total}
              </span>
            </Link>

            <UserDropdown
              email={user.email as string}
              name={user.given_name as string}
              userImage={user.picture}
            />
          </>
        ) : (
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
            <Button variant="ghost" asChild>
              <LoginLink className="hover:bg-slate-300/50">Sign in</LoginLink>
            </Button>
            <span className="h-6 w-px bg-gray-200"></span>
            <Button variant="ghost" asChild>
              <RegisterLink className="hover:bg-slate-300/50">
                Create Account
              </RegisterLink>
            </Button>
          </div>
        )}
      </div>
      <MobileNav user={user ? true : false} isAdmin={isAdmin} total={total} />
    </nav>
  );
}
