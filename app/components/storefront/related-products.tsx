import prisma from "@/app/lib/db";
import { LoadingProductCard, ProductCard } from "./ProductCard";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";

import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getCategory(productId: string) {
  const categoryId = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      categoryId: true,
    },
  });
  return categoryId?.categoryId;
}
async function getData(
  productId: string,
  catId: string | null | undefined,
  userId: string | undefined
) {
  if (!catId) {
    return null;
  }
  const data = await prisma.product.findMany({
    where: {
      status: "published",
      categoryId: catId,
      id: {
        not: productId,
      },
    },
    select: {
      Like: {
        where: {
          userId: userId,
        },
        select: {
          id: true,
        },
      },
      id: true,
      name: true,
      description: true,
      images: true,
      price: true,
      NewPrice: true,
      quantity: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
  });

  return data;
}

export async function RelatedProducts({ productId }: { productId: string }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  noStore();

  const catId = await getCategory(productId);
  const data = await getData(productId, catId, user?.id);
  return (
    <>
      <Suspense fallback={<LoadingRows />}>
        {!!data && data.length > 0 && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold tracking-tight">
                Related Items
              </h2>
              <Link
                className="text-sm font-semibold text-primary hover:text-primary/80"
                href={`/category/${catId}`}
              >
                See more &rarr;
              </Link>
            </div>

            <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {data?.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  isGuest={user ? false : true}
                />
              ))}
            </div>
          </>
        )}
      </Suspense>
    </>
  );
}

function LoadingRows() {
  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
    </div>
  );
}
