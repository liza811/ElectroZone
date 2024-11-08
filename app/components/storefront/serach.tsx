"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex lg:w-[35vw] -ml-4 md:-ml-0 w-[60vw]"
    >
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="border px-4 h-full py-[8.5px] md:rounded-none rounded-tr-none rounded-br-none bg-slate-50 focus-visible:ring-0 focus:ring-0 focus:border-none"
      />
      <button
        type="submit"
        title="search"
        className=" px-4  py-[9px] flex items-center justify-center rounded-tr-md bg-primary text-white h-full rounded-br-md "
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
}
