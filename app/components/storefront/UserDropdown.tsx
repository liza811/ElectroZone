import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { User } from "lucide-react";

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
          className="relative h-10 w-10 rounded-full  text-white"
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

        {/* <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userImage} alt="User Image" />
            <AvatarFallback className="bg-primary">
              <span className="flex items-center justify-center font-bold text-white text-[20px]">
                {name.slice(0, 3)}
              </span>
            </AvatarFallback>
            <AvatarFallback>{name.slice(0, 3)}</AvatarFallback>
          </Avatar>
        </Button> */}
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
          <LogoutLink>Log out</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
