import prisma from "@/app/lib/db";
import { LoadingProductCard } from "./ProductCard";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";

import { CategoryItem } from "./category-item";

async function getData(userId: string | undefined) {
  const data = await prisma.category.findMany({
    select: {
      name: true,
      id: true,
      products: {
        select: {
          Like: {
            where: {
              userId: userId,
            },
            select: {
              id: true,
            },
          },
          price: true,
          images: true,
          description: true,
          name: true,
          NewPrice: true,
          quantity: true,
          id: true,
        },
        take: 8,
      },
    },
  });

  return data;
}

export function OtherProducts({ userId }: { userId: string | undefined }) {
  return (
    <>
      <Suspense fallback={<LoadingCatgoryRows />}>
        <LoadCategories userId={userId} />
      </Suspense>
    </>
  );
}

async function LoadCategories({ userId }: { userId: string | undefined }) {
  noStore();
  const data = await getData(userId);

  return (
    <div className="mt-5 w-full">
      {data.map(
        (item) =>
          item.products.length > 0 && (
            <CategoryItem
              key={item.id}
              item={item}
              isGuest={userId ? false : true}
            />
          )
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
