import { ProductCard } from "@/app/components/storefront/ProductCard";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
interface SearchParams {
  query?: string;
}
export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = searchParams.query;

  if (!query) {
    return notFound();
  }
  noStore();
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Search Results for {query}</h1>

      {products.length > 0 ? (
        <div className=" grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-6">
          {products.map((product) => (
            <ProductCard item={product} key={product.id} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-500">No products found.</p>
      )}
    </div>
  );
}
