import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from "lucide-react";
import { SearchBarMobile } from "./serach";
import { fetchAllCategories } from "@/lib/categories";
import Link from "next/link";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

export async function SearchMobile() {
  const categories = await fetchAllCategories();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Search />
      </PopoverTrigger>
      <PopoverContent
        className="min-w-[360px]  bg-neutral-100 min-h-[50vh] mt-5 "
        side="bottom"
      >
        <SearchBarMobile />
        <ScrollArea className="h-[50vh] ">
          <div className="mt-6 grid grid-cols-3 gap-2  ">
            {categories.map((cat) => (
              <Link
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
