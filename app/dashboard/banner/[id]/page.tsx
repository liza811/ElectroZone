import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

import { EditBanner } from "@/app/components/dashboard/edit-banner";

async function getData(bannerId: string) {
  const data = await prisma.banner.findUnique({
    where: {
      id: bannerId,
    },
    select: {
      id: true,
      title: true,
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

  return <EditBanner data={data} />;
}
