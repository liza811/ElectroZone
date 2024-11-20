import prisma from "@/app/lib/db";
import { cookies } from "next/headers";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

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
export const getMinimalCart = async () => {
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

              price: true,

              NewPrice: true,
            },
          },
        },
      },
    },
  });
  return cart;
};

export const getWhisList = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return null;
  }
  const cart = await prisma.like.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      product: {
        select: {
          id: true,
          images: true,
          price: true,
          name: true,
          NewPrice: true,
          description: true,
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
type GuestWishlist = Array<{ productId: string }>;
export async function getGuestWishlist(): Promise<GuestWishlist> {
  const cookieStore = cookies();
  const wishlistCookie = cookieStore.get("likedItems");

  const guestWishlist: GuestWishlist = wishlistCookie
    ? JSON.parse(decodeURIComponent(wishlistCookie.value))
    : [];

  return guestWishlist;
}

export function getGuestCartt(): GuestCart {
  const cookieStore = cookies();
  const cartCookie = cookieStore.get("guest_cart")?.value;
  return cartCookie ? JSON.parse(cartCookie) : { items: [] };
}

export function clearCart() {
  const guestCart = getGuestCartt();

  if (guestCart?.items) {
    // Iterate over each item and remove it
    guestCart.items.forEach((item: CartGuestItem) => {
      guestCart.items = guestCart.items.filter(
        (cartItem: CartGuestItem) => cartItem.productId !== item.productId
      );
    });
  }

  const updatedGuestCart: GuestCart = {
    items: [],
  };
  saveGuestCart(updatedGuestCart);
}

export function saveGuestCart(cart: GuestCart) {
  const cookieStore = cookies();
  cookieStore.set("guest_cart", JSON.stringify(cart));
}
export async function removeFromGuestWishlist(
  productId: string
): Promise<void> {
  const cookieStore = cookies();
  const wishlistCookie = cookieStore.get("likedItems");

  const guestWishlist: GuestWishlist[] = wishlistCookie
    ? JSON.parse(decodeURIComponent(wishlistCookie.value))
    : [];

  const updatedWishlist = guestWishlist.filter(
    //@ts-ignore
    (item) => item.productId !== productId
  );

  // Update the cookie with the modified wishlist
  cookieStore.set(
    "likedItems",
    encodeURIComponent(JSON.stringify(updatedWishlist))
  );
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
export async function getProductsFromGuestCart2(guestCart: GuestCart) {
  const productIds = guestCart.items.map((item) => item.productId);

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    select: {
      id: true,

      price: true,
      NewPrice: true,
    },
  });

  return products;
}
export async function getProductsFromGuestWhishList(guestCart: GuestWishlist) {
  const productIds = guestCart.map((item) => item.productId);

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      NewPrice: true,
      images: true,
    },
  });

  return products;
}
