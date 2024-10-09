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
import { DeleteProduct } from "@/app/components/dashboard/delete-product";

async function getData() {
  const data = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function ProductsRoute() {
  noStore();
  const data = await getData();
  return (
    <main className="bg-[#fdfbfb] h-full my-5">
      <section className="flex w-full h-full  justify-between px-6 py-3">
        <div>
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Products
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your products and view their sales performance
          </p>
        </div>
        <div className="flex items-center justify-end">
          <Button asChild className="flex gap-x-2">
            <Link href="/dashboard/products/create">
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Add Product</span>
            </Link>
          </Button>
        </div>
      </section>

      <section className=" md:px-4 lg:px-10 w-full ">
        <Table className=" md:px-4 lg:px-10 md:mt-5 border w-[95%] mx-auto">
          <TableHeader className="bg-[#E9EDFB] ">
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>New Price</TableHead>
              <TableHead className="text-start">Quantity</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-end -ml-10">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full bg-neutral-50">
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Image
                    alt="Product Image"
                    src={item.images[0]}
                    height={64}
                    width={64}
                    className="rounded-md object-cover h-16 w-16"
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>
                  <p>
                    {item.NewPrice ? `$${item.NewPrice.toFixed(2)}` : "null"}
                  </p>
                </TableCell>
                <TableCell className="text-start pl-11 w-fit ">
                  {item.quantity}
                </TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("en-US").format(item.createdAt)}
                </TableCell>
                <TableCell className="text-end">
                  <DeleteProduct productId={item.id} />

                  <Link href={`/dashboard/products/${item.id}`}>
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
