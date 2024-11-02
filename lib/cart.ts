import prisma from "@/app/lib/db";
import { cookies } from "next/headers";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export const getCart = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return null;
  }
  const cart = await prisma.cart.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      items: {
        select: {
          id: true,
          quantity: true,
          product: {
            select: {
              id: true,
              images: true,
              price: true,
              name: true,
              NewPrice: true,
            },
          },
        },
      },
    },
  });
  return cart;
};

export async function getGuestCart(): Promise<GuestCart> {
  const cookieStore = cookies();
  const cartCookie = cookieStore.get("guest_cart");

  const guestCart: GuestCart = cartCookie
    ? JSON.parse(decodeURIComponent(cartCookie.value))
    : { items: [] };

  return guestCart;
}

export function getGuestCartt(): GuestCart {
  const cookieStore = cookies();
  const cartCookie = cookieStore.get("guest_cart")?.value;
  return cartCookie ? JSON.parse(cartCookie) : { items: [] };
}

export async function clearCart() {
  const cookieStore = cookies();

  cookieStore.set("guest_cart", "", { expires: new Date(0), path: "/" });
  revalidatePath("/");
  revalidatePath("/cart");
}
export function saveGuestCart(cart: GuestCart) {
  const cookieStore = cookies();
  cookieStore.set("guest_cart", JSON.stringify(cart));
}
export function deleteGuestCartItem(productId: string) {
  const guestCart = getGuestCartt();

  const updatedCartItems = guestCart?.items.filter(
    (item: CartGuestItem) => item.productId !== productId
  );

  const updatedGuestCart: GuestCart = {
    items: updatedCartItems,
  };

  saveGuestCart(updatedGuestCart);
}
interface CartGuestItem {
  productId: string;
  quantity: number;
}

export interface GuestCart {
  items: CartGuestItem[];
}

export async function getProductsFromGuestCart(guestCart: GuestCart) {
  const productIds = guestCart.items.map((item) => item.productId);

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    select: {
      id: true,
      name: true,
      price: true,
      NewPrice: true,
      images: true,
    },
  });

  return products;
}
