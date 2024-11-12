import { LoadingRows } from "@/app/components/storefront/FeaturedProducts";
import { ProductCard } from "@/app/components/storefront/ProductCard";
import { getAllFeaturedProducts } from "@/app/lib/products";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";

export default async function CategoriesPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  noStore();
  const data = await getAllFeaturedProducts(user?.id);
  return (
    <section>
      <h1 className="font-semibold text-3xl my-5 capitalize">
        {"All Products"}
      </h1>
      <Suspense fallback={<LoadingRows />}>
        <div className=" grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-6">
          {data.map((item) => (
            <ProductCard
              item={item}
              key={item.id}
              isGuest={user ? false : true}
            />
          ))}
        </div>
      </Suspense>
    </section>
  );
}
