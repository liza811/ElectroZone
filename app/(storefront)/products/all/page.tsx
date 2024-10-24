import { ProductCard } from "@/app/components/storefront/ProductCard";
import prisma from "@/app/lib/db";

import { unstable_noStore as noStore } from "next/cache";

async function getData() {
  const data = await prisma.product.findMany({
    select: {
      name: true,
      images: true,
      price: true,
      id: true,
      description: true,
      NewPrice: true,
      quantity: true,
    },
    where: {
      status: "published",
    },
  });
  return data;
}

export default async function CategoriesPage() {
  noStore();
  const data = await getData();
  return (
    <section>
      <h1 className="font-semibold text-3xl my-5 capitalize">
        {"All Products"}
      </h1>
      <div className=" grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-6">
        {data.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
