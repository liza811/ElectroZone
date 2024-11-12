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
        placeholder="Search your products..."
        className="border px-4 h-full py-[8.5px]  rounded-tl-none rounded-bl-none bg-neutral-100 focus-visible:ring-0 focus:ring-0 focus:border-none"
      />
    </form>
  );
}
