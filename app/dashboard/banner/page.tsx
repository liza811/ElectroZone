import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditIcon, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { DeleteBanner } from "@/app/components/storefront/select-payment-option";

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function BannerRoute() {
  noStore();
  const data = await getData();

  return (
    <main className="bg-main h-full my-5">
      <section className="flex w-full h-full  justify-between px-6 py-3">
        <div>
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Banners
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your banners
          </p>
        </div>
        <div className="flex items-center justify-end">
          <Button asChild className="flex gap-x-2">
            <Link href="/dashboard/banner/create">
              <PlusCircle className="size-4" />
              <span>Add Banner</span>
            </Link>
          </Button>
        </div>
      </section>
      <section className=" md:px-4 lg:px-10 w-full ">
        <Table className=" md:px-4 lg:px-10 md:mt-5 border w-[80%] mx-auto">
          <TableHeader className="bg-[#E9EDFB] ">
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-end">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="w-full bg-neutral-50">
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Image
                    alt="Product Image"
                    src={item.imageString}
                    width={64}
                    height={64}
                    className="rounded-lg object-cover h-16 w-16"
                  />
                </TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell className="text-end">
                  <DeleteBanner bannerId={item.id} />

                  <Link href={`/dashboard/banner/${item.id}`}>
                    <Button
                      variant="outline"
                      className="bg-transparent hover:bg-transparent border-none -ml-4 "
                    >
                      <EditIcon className="size-5 text-green-500 hover:text-green-400" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
