import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getAllFeaturedProducts(userId: string | undefined) {
  const data = await prisma.product.findMany({
    where: {
      status: "published",
      OR: [
        {
          isFeatured: true,
        },
        {
          NewPrice: {
            gt: 0,
          },
        },
      ],
    },
    select: {
      Like: {
        where: {
          userId: userId,
        },
        select: {
          id: true,
        },
      },
      id: true,
      name: true,
      description: true,
      images: true,
      price: true,
      NewPrice: true,
      quantity: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}
