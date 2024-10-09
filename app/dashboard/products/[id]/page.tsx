import { EditForm } from "@/app/components/dashboard/EditForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { fetchCategories } from "@/lib/categories";
import { CatgoriesT } from "../create/page";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      Category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EditRoute({
  params,
}: {
  params: { id: string };
}) {
  noStore();
  const data = await getData(params.id);
  const categories: CatgoriesT = await fetchCategories();
  return <EditForm data={data} categories={categories} />;
}
