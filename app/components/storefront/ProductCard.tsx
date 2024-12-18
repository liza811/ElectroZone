import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { LikeButton } from "./like-button";
interface Like {
  id: number;
}
interface iAppProps {
  isGuest: boolean;

  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    NewPrice: number | null;
    quantity: number;
    Like: Like[];
  };
}

export function ProductCard({ item, isGuest }: iAppProps) {
  return (
    <div className="rounded-md  bg-white overflow-hidden border p-3 h-full flex flex-col">
      <div className="flex-1">
        <Carousel className="w-full mx-auto">
          <CarouselContent>
            {item.images.map((itemm, index) => (
              <CarouselItem key={index}>
                <div className=" min-h-[200px] mi-h-[250px] rounded-md bg-white relative">
                  <Image
                    src={itemm}
                    alt="Product Image"
                    fill
                    className="object-contain rounded-sm"
                  />

                  <div className="absolute top-2 right-2">
                    <LikeButton
                      productId={item.id}
                      isGuest={isGuest}
                      liked={item.Like?.length > 0 ? true : false}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-[3.4rem]" />
          <CarouselNext className="mr-[3.4rem]" />
        </Carousel>

        <div className="flex justify-between gap-x-2  mt-4">
          <h1 className="font-semibold text-lg line-clamp-1">{item.name}</h1>

          {!!item.NewPrice ? (
            <div className="h-fit flex flex-row-reverse gap-x-2 min-w-fit items-center gap-y-2 ">
              <h3 className="inline-flex items-center rounded-md bg-red-500/10 px-2 py-1 text-sm font-medium text-red-500 ring-1 ring-inset ring-red-500/10">
                {item.NewPrice} AED
              </h3>
              <p className="text-slate-600 text-sm line-through -mt-4">
                {" "}
                {item.price} AED
              </p>
            </div>
          ) : (
            <h3 className="inline-flex items-center min-w-fit rounded-md bg-primary/10 px-2 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/10">
              {item.price} AED
            </h3>
          )}
        </div>
        <p className="text-gray-600 text-[13px] mt-2 line-clamp-2 ">
          {item.description}
        </p>
      </div>

      <div className="w-full flex justify-center items-end  mt-auto">
        <Button asChild className="w-[70%] mt-5 mx-auto">
          <Link href={`/product/${item.id}`}>See More!</Link>
        </Button>
      </div>
    </div>
  );
}

export function LoadingProductCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-[330px]" />
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="w-full h-6" />
      </div>
      <Skeleton className="w-full h-10 mt-5" />
    </div>
  );
}
