import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogOutIcon } from "lucide-react";

interface iAppProps {
  email: string;
  name: string;
  userImage: string | null;
}

export function UserDropdown({ email, name, userImage }: iAppProps) {
  console.log(userImage);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="relative h-10 w-10 rounded-full  text-white -mr-5 md:-mr-0"
          variant={"outline"}
        >
          {userImage !== null ? (
            <>
              <Avatar className="h-10 w-10">
                {/* <AvatarImage src={userImage} alt="User Image" /> */}
                <AvatarFallback className="bg-slate-100">
                  <span className="flex items-center justify-center font-bold text-black/90 text-[16px]">
                    {name.slice(0, 3)}
                  </span>
                </AvatarFallback>
              </Avatar>
            </>
          ) : (
            <p className="text-white bg-primary h-full w-full">
              `${name.slice(0, 3)}`
            </p>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-neutral-50"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{name}</p>
          <p className="text-xs leading-none text-muted-foreground">{email}</p>
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
  );
}
