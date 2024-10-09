import prisma from "@/app/lib/db";

export async function getAllFeaturedProducts() {
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
