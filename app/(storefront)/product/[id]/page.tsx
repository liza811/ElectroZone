import { addItem } from "@/app/actions";
import { ShoppingBagButton } from "@/app/components/SubmitButtons";

import { ImageSlider } from "@/app/components/storefront/ImageSlider";
import prisma from "@/app/lib/db";

import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { RelatedProducts } from "@/app/components/storefront/related-products";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      name: true,
      id: true,
      NewPrice: true,
      quantity: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function ProductIdRoute({
  params,
}: {
  params: { id: string };
}) {
  noStore();
  const data = await getData(params.id);
  const addProducttoShoppingCart = addItem.bind(null, data.id);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
        <ImageSlider images={data.images} />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {data.name}
          </h1>

          {!!data.NewPrice ? (
            <div className="h-fit flex flex-row-reverse gap-x-2 w-fit items-center gap-y-2 mt-3">
              <h3 className="inline-flex items-center rounded-md bg-red-500/10 px-2 py-1 text-base font-medium text-red-500 ring-1 ring-inset ring-red-500/10">
                ${data.NewPrice}
              </h3>
              <p className="text-slate-600 text-sm line-through">
                {" "}
                ${data.price}
              </p>
            </div>
          ) : (
            <p className="inline-flex  mt-3 items-center rounded-md bg-primary/10 px-2 py-1 text-base font-medium text-primary ring-1 ring-inset ring-primary/10">
              ${data.price}
            </p>
          )}
          {/* <div className="mt-3 flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          </div> */}
          <p className="text-base text-gray-700 mt-6">{data.description}</p>

          <form action={addProducttoShoppingCart}>
            <ShoppingBagButton />
          </form>
        </div>
      </div>

      <div className="my-12">
        <RelatedProducts productId={params.id} />
      </div>
    </>
  );
}
