import { ImageSlider } from "@/app/components/storefront/ImageSlider";
import prisma from "@/app/lib/db";

import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { RelatedProducts } from "@/app/components/storefront/related-products";
import { InfoIcon } from "lucide-react";

import Image from "next/image";
import QuantitySelector from "@/app/components/storefront/quantity-selector";

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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6 ">
        <ImageSlider images={data.images} />
        <div className="mt-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {data.name}
          </h1>

          {!!data.NewPrice ? (
            <div className="h-fit flex flex-row-reverse gap-x-2 w-fit items-center gap-y-2 mt-3 font-semibold">
              <h3 className="inline-flex items-center rounded-md bg-red-500/10 px-3 py-1 text-[20px] font-medium text-red-500 ring-1 ring-inset ring-red-500/10">
                {data.NewPrice} AED
              </h3>
              <p className="text-slate-600 text-base px-3 line-through">
                {" "}
                {data.price} AED
              </p>
            </div>
          ) : (
            <p className="inline-flex  mt-3 items-center rounded-md bg-primary/10 px-3 py-1 text-[20px] font-medium text-primary ring-1 ring-inset ring-primary/10">
              {data.price} AED
            </p>
          )}

          <p className="text-base text-gray-700 mt-6">{data.description}</p>
          <QuantitySelector
            productId={data.id}
            totalQuantity={data.quantity}
            outOfStock={data.quantity <= 0 ? true : false}
          />

          {/* <div className="w-full flex justify-center gap-x-2 mt-3">
            <Image
              alt="mastercard"
              src={"/mastercard.svg"}
              width={50}
              height={60}
              className="rounded-sm border object-cover"
            />
            <Image
              alt="apple"
              src={"/apple.svg"}
              width={50}
              height={60}
              className="rounded-sm border object-cover"
            />
            <Image
              alt="americanexpress"
              src={"/americanexpress.svg"}
              width={50}
              height={60}
              className="rounded-sm border object-cover"
            />
            <Image
              alt="visa card"
              src={"/visa.svg"}
              width={50}
              height={60}
              className="rounded-sm border object-cover"
            />
          </div> */}
          <p className=" flex gap-x-2 mt-4 font-bold text-blue-950">
            <InfoIcon className="size-6 text-orange-500" />
            {data.quantity === 1
              ? ` Only ${data.quantity} left in stock!`
              : `${data.quantity} left in stock!`}
          </p>
        </div>
      </div>

      <div className="my-2">
        <RelatedProducts productId={params.id} />
      </div>
    </>
  );
}
