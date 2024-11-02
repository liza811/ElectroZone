import { ReactNode } from "react";
import { DashboardNavigation } from "../components/dashboard/DasboardNavigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CircleUser, LogOutIcon, MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { unstable_noStore as noStore } from "next/cache";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  noStore();
  const { getUser, getPermission } = getKindeServerSession();
  const user = await getUser();
  const permission = await getPermission("dashboard");

  const isAdmin = permission?.isGranted ? true : false;
  if (!user || !isAdmin) {
    return redirect("/");
  }
  return (
    <div className="flex w-full flex-col  bg-[#e3e6f3]/40 ">
      <header className=" z-50  fixed h-[80px] flex w-full items-center justify-between  px-4 sm:px-6 lg:px-8 gap-4 border-b bg-[#e3e6f3] shadow-lg ">
        <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <DashboardNavigation />
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="shrink-0 md:hidden bg-transparent"
              variant="outline"
              size="icon"
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col gap-6 text-lg font-medium mt-5">
              <DashboardNavigation />
            </nav>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-neutral-50"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.given_name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <LogoutLink className="flex gap-x-2 items-center">
                <LogOutIcon className="size-4 text-slate-500 " />
                Log out
              </LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="  px-4 sm:px-6 lg:px-8 pt-[80px] h-full bg-main">
        {children}
      </main>
    </div>
  );
}
