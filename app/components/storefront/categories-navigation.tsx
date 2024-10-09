import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchAllCategories } from "@/lib/categories";
import Image from "next/image";
import Link from "next/link";

export async function CategoriesNavigation() {
  const categories = await fetchAllCategories();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="relative transition-all group p-2 font-[600] hover:text-primary bg-none bg-transparent hover:bg-transparent ml-3 focus-visible:ring-0 focus:ring-0 focus-visible:ring-offset-0"
        >
          All categories
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-neutral-100">
        <DropdownMenuLabel>Our Categories</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-neutral-200" />
        {categories.map((cat) => (
          <Link
            href={`/category/${cat.id}`}
            key={cat.id}
            className="cursor-pointer hover:bg-neutral-50"
          >
            <DropdownMenuItem className="cursor-pointer">
              <Image
                src={cat.imageString}
                width={30}
                height={30}
                alt="category image "
                className="mr-3 rounded-sm"
              />
              <span>{cat.name}</span>
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
