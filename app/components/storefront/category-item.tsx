import Link from "next/link";
import { Suspense } from "react";
import { LoadingCatgoryRows } from "./other-products";
import { ProductCard } from "./ProductCard";
interface Like {
  id: number;
}
interface iAppProps {
  isGuest: boolean;

  item: {
    id: string;
    name: string;
    products: {
      Like: Like[];
      id: string;
      name: string;
      description: string;
      price: number;
      NewPrice: number | null;
      quantity: number;
      images: string[];
    }[];
  };
}
export const CategoryItem = ({ item, isGuest }: iAppProps) => {
  return (
    <section className="my-10">
      <div className="flex  justify-between gap-x-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-wrap">
          {item.name} Products
        </h2>
        <Link
          className="text-sm font-semibold text-primary hover:text-primary/80 pt-2 "
          href={`/category/${item.id}`}
        >
          See more &rarr;
        </Link>
      </div>
      <Suspense fallback={<LoadingCatgoryRows />}>
        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {item.products.map((item) => (
            <ProductCard key={item.id} item={item} isGuest={isGuest} />
          ))}
        </div>
      </Suspense>
    </section>
  );
};
