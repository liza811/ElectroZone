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

interface iAppProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    NewPrice: number | null;
    quantity: number;
  };
}

export function ProductCard({ item }: iAppProps) {
  return (
    <div className="rounded-md cursor-pointer bg-white overflow-hidden border p-3 h-full flex flex-col">
      <div className="flex-1">
        <Carousel className="w-full mx-auto">
          <CarouselContent>
            {item.images.map((item, index) => (
              <CarouselItem key={index}>
                <div className="aspect-square min-h-[200px] rounded-md bg-gray-100 relative">
                  <Image
                    src={item}
                    alt="Product Image"
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-[3.4rem]" />
          <CarouselNext className="mr-[3.4rem]" />
        </Carousel>

        <div className="flex justify-between gap-x-2  mt-4">
          <h1 className="font-semibold text-xl line-clamp-1">{item.name}</h1>

          {!!item.NewPrice ? (
            <div className="h-fit flex flex-row-reverse gap-x-2 w-fit items-center gap-y-2 ">
              <h3 className="inline-flex items-center rounded-md bg-red-500/10 px-2 py-1 text-sm font-medium text-red-500 ring-1 ring-inset ring-red-500/10">
                ${item.NewPrice}
              </h3>
              <p className="text-slate-600 text-sm line-through">
                {" "}
                ${item.price}
              </p>
            </div>
          ) : (
            <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/10">
              ${item.price}
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
