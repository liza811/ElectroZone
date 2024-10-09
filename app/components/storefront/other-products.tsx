import prisma from "@/app/lib/db";
import { LoadingProductCard } from "./ProductCard";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";

import { CategoryItem } from "./category-item";

async function getData() {
  const data = await prisma.category.findMany({
    select: {
      name: true,
      id: true,
      products: {
        select: {
          price: true,
          images: true,
          description: true,
          name: true,
          NewPrice: true,
          quantity: true,
          id: true,
        },
      },
    },
    take: 4,
  });

  return data;
}

export function OtherProducts() {
  return (
    <>
      <Suspense fallback={<LoadingCatgoryRows />}>
        <LoadCategories />
      </Suspense>
    </>
  );
}

async function LoadCategories() {
  noStore();
  const data = await getData();

  return (
    <div className="mt-5 w-full">
      {data.map(
        (item) =>
          item.products.length > 0 && <CategoryItem key={item.id} item={item} />
      )}
    </div>
  );
}

export function LoadingCatgoryRows() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <LoadingProductCard />

        <LoadingProductCard />
      </div>
      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </section>
  );
}
