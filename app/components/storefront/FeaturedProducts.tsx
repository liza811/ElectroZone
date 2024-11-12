import prisma from "@/app/lib/db";
import { LoadingProductCard, ProductCard } from "./ProductCard";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";

import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getData(userId: string | undefined) {
  const data = await prisma.product.findMany({
    where: {
      status: "published",
      OR: [
        {
          isFeatured: true,
        },
        {
          NewPrice: {
            gt: 0,
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      price: true,
      NewPrice: true,
      quantity: true,
      Like: {
        where: {
          userId: userId,
        },
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
  });

  return data;
}

export async function FeaturedProducts({
  userId,
}: {
  userId: string | undefined;
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight">
          Featured Items
        </h2>
        <Link
          className="text-sm font-semibold text-primary hover:text-primary/80"
          href="/products/all/featured"
        >
          See more &rarr;
        </Link>
      </div>
      <Suspense fallback={<LoadingRows />}>
        <LoadFeaturedproducts userId={userId} />
      </Suspense>
    </>
  );
}

async function LoadFeaturedproducts({
  userId,
}: {
  userId: string | undefined;
}) {
  noStore();

  const data = await getData(userId);

  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {data.map((item) => (
        <ProductCard
          item={item}
          key={item.id}
          isGuest={userId ? false : true}
        />
      ))}
    </div>
  );
}
export function LoadingRows() {
  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
    </div>
  );
}
