import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

import { EditBanner } from "@/app/components/dashboard/edit-banner";
import { EditCategory } from "@/app/components/dashboard/edit-category";

async function getData(categoryId: string) {
  const data = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    select: {
      id: true,
      name: true,
      imageString: true,
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

  return <EditCategory data={data} />;
}