import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchAllCategories } from "@/lib/categories";
import Image from "next/image";
import Link from "next/link";

import { ChevronDown } from "lucide-react";
import { SearchBar } from "./serach";

export async function CategoriesNavigation() {
  const categories = await fetchAllCategories();
  return (
    <section className="flex flex-row-reverse items-center md:ml-2 bg-gray-300 border rounded-md max-h-10 w-fit ">
      <SearchBar />
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="-pl-5 hidden md:flex">
          <Button
            variant="outline"
            className="relative h-10 flex gap-x-2 items-center border-none transition-all group md:p-2 mt-1 md:mt-0   font-[500] hover:text-primary bg-none bg-transparent hover:bg-transparent text-sm md:ml-3 focus-visible:ring-0 focus:ring-0 focus-visible:ring-offset-0"
          >
            All categories
            <ChevronDown className="size-4" />
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
    </section>
  );
}
