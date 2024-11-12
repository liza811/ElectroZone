"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, X } from "lucide-react";
import { SearchBarMobile } from "./serach";

import Link from "next/link";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
type Category = {
  id: string;
  imageString: string;
  name: string;
};

type CategoryListProps = {
  categories: Category[];
};
export function SearchMobile(categories: CategoryListProps) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="-mr-2 flex md:hidden">
        {open ? <X /> : <Search />}
      </PopoverTrigger>
      <PopoverContent
        className="min-w-[360px]  bg-neutral-100 min-h-[50vh] mt-5 "
        side="bottom"
      >
        <SearchBarMobile />
        <ScrollArea className="h-[50vh] ">
          <div className="mt-6 grid grid-cols-3 gap-2  ">
            {categories.categories.map((cat) => (
              <Link
                onClick={() => setOpen(false)}
                key={cat.id}
                href={`/category/${cat.id}`}
                className="rounded-md cursor-pointer bg-white overflow-hidden border p-1 h-full  "
              >
                {/* <div className="aspect-square h-[35px] rounded-md relative">
                <Image
                  src={cat.imageString}
                  alt={cat.name}
                  fill
                  className="object-contain rounded-sm"
                />
              </div> */}

                <p className="mt-2 rounded-md px-3 py-1 w-fit mx-auto text-gray-900 text-center text-[13px] font-medium">
                  {cat.name}
                </p>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
