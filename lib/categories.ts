import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const fetchCategories = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "lizadjebara49@gmail.com") {
    return redirect("/");
  }

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return categories;
};
export const fetchAllCategories = async () => {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      imageString: true,
    },
  });
  return categories;
};

// export async function getProductsByCategory(categoryId: string) {
//   const data = await prisma.product.findMany({
//     where: {
//       categoryId: categoryId,
//     },
//     select: {
//       price: true,
//       images: true,
//       description: true,
//       name: true,
//       id: true,
//     },
//   });

//   return data;
// }
export async function getProductsByCategory(
  categoryId: string,
  userId: string | undefined
) {
  const data = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    select: {
      imageString: true,
      name: true,
      products: {
        select: {
          Like: {
            where: {
              userId: userId,
            },
            select: {
              id: true,
            },
          },
          price: true,
          images: true,
          description: true,
          name: true,
          NewPrice: true,
          quantity: true,
          id: true,
        },
      },
    },
  });

  return data;
}
