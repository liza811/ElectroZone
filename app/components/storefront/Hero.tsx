import prisma from "@/app/lib/db";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export async function Hero() {
  const data = await getData();

  return (
    <Carousel>
      <CarouselContent>
        {data.map((item) => (
          <CarouselItem key={item.id}>
            <Link href={item.imageString}>
              <div className="relative h-[40vh] lg:h-[58vh] md:w-[90%] w-[100%] mt-6 mx-auto">
                <Image
                  alt="Banner Image"
                  src={item.imageString}
                  width={600}
                  height={400}
                  className=" h-full w-full rounded-xl"
                />

                <h1 className="text-lg lg:text-2xl font-bold text-center    absolute top-6 left-6 bg-opacity-75 bg-black text-white p-2 md:p-4 md:py-2 rounded-lg flex justify-center items-center shadow-lg transition-transform hover:scale-105">
                  {item.title}
                </h1>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16 bg-neutral-100" />
      <CarouselNext className="mr-16 bg-neutral-100" />
    </Carousel>
  );
}
