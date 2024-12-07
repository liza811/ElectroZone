import { fetchAllCategories } from "@/lib/categories";
import { hexToRgba, stringToColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export interface CategoriesSelectionI {
  categories:
    | {
        id: string;
        imageString: string;
        name: string;
      }[]
    | null;
}
export async function CategoriesSelection() {
  const categories = await fetchAllCategories();
  return (
    <div className="py-16 sm:py-10">
      <div className="flex justify-between ">
        <h2 className=" text-[18px] md:text-2xl font-extrabold tracking-tight ">
          Shop by Category
        </h2>

        <Link
          className="text-sm font-semibold text-primary hover:text-primary/80 pt-2 "
          href="/products/all"
        >
          Browse all &rarr;
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.id}`}
            className="rounded-md cursor-pointer bg-white overflow-hidden border p-3 h-full"
          >
            <div className="aspect-square min-h-[200px] rounded-md bg-gray-100 relative">
              <Image
                src={cat.imageString}
                alt={cat.name}
                fill
                className="object-cover rounded-sm"
              />
            </div>

            <p
              className="mt-2 rounded-md px-3 py-1 w-fit mx-auto text-black text-center text-[13px] font-semibold"
              style={{
                color: `${stringToColor(cat.name.toUpperCase())}`,
                backgroundColor: hexToRgba(
                  stringToColor(cat.name.toUpperCase()),
                  0.2
                ),
              }}
            >
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
