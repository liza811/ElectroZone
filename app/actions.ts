"use server";
import { v4 as uuidv4 } from "uuid";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema, deliverySchema, productSchema } from "./lib/zodSchemas";
import prisma from "./lib/db";

import { revalidatePath } from "next/cache";
import { stripe } from "./lib/stripe";
import Stripe from "stripe";
import { CartGuestItem, GuestCart } from "./lib/interfaces";

import {
  deleteGuestCartItem,
  getCart,
  getGuestCartt,
  getProductsFromGuestCart,
  removeFromGuestWishlist,
  saveGuestCart,
} from "@/lib/cart";
import { sendTwoFactorTokenEmail } from "./lib/mail";

export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser, getPermission } = getKindeServerSession();
  const user = await getUser();
  const permission = await getPermission("dashboard");

  const isAdmin = permission?.isGranted ? true : false;
  if (!user || !isAdmin) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      NewPrice: submission.value.newPrice,
      quantity: submission.value.quantity,

      images: flattenUrls,
      categoryId: submission.value.category,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  });

  redirect("/dashboard/products");
}
export async function addOrder(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const total = formData.get("total") as unknown as number;
  const products = JSON.parse(formData.get("products") as string);

  const submission = parseWithZod(formData, {
    schema: deliverySchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  let order;
  const orderNumber = generateOrderNumber();
  order = await prisma.order.create({
    data: {
      orderNumber: orderNumber,
      amount: Number(total),
      guestName: submission.value.name,
      cashOnDelivery: true,
      billingAddressLine2: submission.value.addressComplement,
      guestPhone: submission.value.phone,
      billingAddressLine1: submission.value.streetAddress,
      billingPostalCode: submission.value.postalCode,
      billingCity: submission.value.City,
      billingCountry: submission.value.Country,
      guestEmail: submission.value.email,

      orderItems: {
        create: products.map((item: { id: string; quantity: number }) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      },
    },
  });

  if (order && user) {
    await Promise.all(
      products.map(async (item: { id: string; quantity: number }) => {
        await prisma.product.update({
          where: { id: item.id },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });
      })
    );
    await prisma.cart.delete({
      where: {
        userId: user.id,
      },
    });
  } else {
    clearCart();
    await Promise.all(
      products.map(async (item: { id: string; quantity: number }) => {
        await prisma.product.update({
          where: { id: item.id },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });
      })
    );
  }
  await sendTwoFactorTokenEmail(
    submission.value.email,

    orderNumber,
    products,
    total,
    submission.value.name
  );
  redirect("/payment/success");
}

export async function deliveryOrder(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const productId = formData.get("productId") as string;
  const quantity = Number(formData.get("quantity"));
  const products = [{ id: productId, quantity: quantity }];
  const submission = parseWithZod(formData, {
    schema: deliverySchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      NewPrice: true,
      quantity: true,
    },
  });
  if (!product || quantity > product.quantity) {
    notFound();
  }
  let order;
  const orderNumber = generateOrderNumber();
  const total = product.NewPrice
    ? quantity * product.NewPrice
    : quantity * product.price;
  order = await prisma.order.create({
    data: {
      orderNumber: orderNumber,
      cashOnDelivery: true,
      billingAddressLine2: submission.value.addressComplement,
      amount: total,
      billingAddressLine1: submission.value.streetAddress,
      guestName: submission.value.name,
      userId: user?.id,
      billingCity: submission.value.City,
      billingCountry: submission.value.Country,
      guestEmail: submission.value.email,

      orderItems: {
        create: {
          productId: productId,
          quantity: quantity,
        },
      },
    },
  });

  if (order) {
    await prisma.product.update({
      where: { id: productId },
      data: {
        quantity: {
          decrement: quantity,
        },
      },
    });
  }

  await sendTwoFactorTokenEmail(
    submission.value.email,

    orderNumber,
    products,
    total,
    submission.value.name
  );
  redirect("/payment/success");
}
export async function editProduct(prevState: any, formData: FormData) {
  const { getUser, getPermission } = getKindeServerSession();
  const user = await getUser();
  const permission = await getPermission("dashboard");

  const isAdmin = permission?.isGranted ? true : false;
  if (!user || !isAdmin) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  const productId = formData.get("productId") as string;
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      categoryId: submission.value.category,
      price: submission.value.price,
      NewPrice: submission.value.newPrice,
      quantity: submission.value.quantity,
      isFeatured: submission.value.isFeatured === true ? true : false,
      status: submission.value.status,
      images: flattenUrls,
    },
  });
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function editCategory(prevState: any, formData: FormData) {
  const { getUser, getPermission } = getKindeServerSession();
  const user = await getUser();
  const permission = await getPermission("dashboard");

  const isAdmin = permission?.isGranted ? true : false;
  if (!user || !isAdmin) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.imageString;

  const categoryId = formData.get("categoryId") as string;
  await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name: submission.value.title,

      imageString: flattenUrls,
    },
  });

  redirect("/dashboard/categories");
}

export async function editBanner(prevState: any, formData: FormData) {
  const { getUser, getPermission } = getKindeServerSession();
  const user = await getUser();
  const permission = await getPermission("dashboard");

  const isAdmin = permission?.isGranted ? true : false;
  if (!user || !isAdmin) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.imageString;

  const bannerId = formData.get("bannerId") as string;
  await prisma.banner.update({
    where: {
      id: bannerId,
    },
    data: {
      title: submission.value.title,

      imageString: flattenUrls,
    },
  });

  redirect("/dashboard/banner");
}
export async function deleteProduct(productId: string) {
  const { getUser, getPermission } = getKindeServerSession();
  const user = await getUser();
  const permission = await getPermission("dashboard");

  const isAdmin = permission?.isGranted ? true : false;
  if (!user || !isAdmin) {
    return redirect("/");
  }

  await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  revalidatePath("/dashboard/products");
  return { success: "Product Deleted!" };
}
export async function createCategory(prevState: any, formData: FormData) {
  const { getUser, getPermission } = getKindeServerSession();
  const user = await getUser();
  const permission = await getPermission("dashboard");

  const isAdmin = permission?.isGranted ? true : false;
  if (!user || !isAdmin) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.category.create({
    data: {
      name: submission.value.title,
      imageString: submission.value.imageString,
    },
  });

  redirect("/dashboard/categories");
}
export async function createBanner(prevState: any, formData: FormData) {
  const { getUser, getPermission } = getKindeServerSession();
  const user = await getUser();
  const permission = await getPermission("dashboard");

  const isAdmin = permission?.isGranted ? true : false;
  if (!user || !isAdmin) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  });

  redirect("/dashboard/banner");
}

export async function deleteBanner(bannerId: string) {
  const { getUser, getPermission } = getKindeServerSession();
  const user = await getUser();
  const permission = await getPermission("dashboard");

  const isAdmin = permission?.isGranted ? true : false;
  if (!user || !isAdmin) {
    return redirect("/");
  }

  await prisma.banner.delete({
    where: {
      id: bannerId,
    },
  });

  revalidatePath("/dashboard/banner");
  return { success: "Banner Deleted!" };
}
export async function deleteCategory(categoryId: string) {
  const { getUser, getPermission } = getKindeServerSession();
  const user = await getUser();
  const permission = await getPermission("dashboard");

  const isAdmin = permission?.isGranted ? true : false;
  if (!user || !isAdmin) {
    return redirect("/");
  }

  await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });

  revalidatePath("/dashboard/categories");
  return { success: "Category Deleted!" };
}

export async function addItemToGuestCart(productId: string, quantity: number) {
  // Get the existing cart from cookies
  const cart = getGuestCartt();

  // Check if the product already exists in the cart
  const existingCartItem = cart.items.find(
    (item: any) => item.productId === productId
  );

  if (existingCartItem) {
    // If the item exists, update the quantity
    existingCartItem.quantity += quantity;
  } else {
    // Otherwise, add new item to cart
    cart.items.push({ productId, quantity });
  }

  // Save the updated cart back to cookies
  saveGuestCart(cart);

  return { message: "Item added to cart", cart };
}
export async function addItem(productId: string, quantity: number) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    const cart = await addItemToGuestCart(productId, quantity);

    return cart.cart;
  }

  try {
    // Check if the user has a cart
    let cart = await prisma.cart.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        items: true,
      },
    });

    // If no cart exists, create one
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: user.id,
          items: {
            create: {
              productId: productId,
              quantity: quantity,
            },
          },
        },
        include: {
          items: true,
        },
      });
      return { message: "Item added to cart.", cart };
    }

    // Check if the product already exists in the cart
    const existingCartItem = cart.items.find(
      (item) => item.productId === productId
    );

    if (existingCartItem) {
      // Update the quantity if it already exists
      const updatedCartItem = await prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
      });
      return { message: "Cart item updated.", updatedCartItem };
    } else {
      // If the product doesn't exist, add it to the cart
      const newCartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: productId,
          quantity: quantity,
        },
      });
      revalidatePath("/");

      return { message: "Item added to cart.", newCartItem };
    }
  } catch (error) {
    throw new Error("Failed to add item to cart");
  }
}

export async function delItem(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    const productId = formData.get("itemCartId") as string;
    if (productId) {
      deleteGuestCartItem(productId);
      revalidatePath("/bag");
    }
    return;
  }

  const itemCartId = formData.get("itemCartId");

  if (!itemCartId) {
    return { message: "Item not found in cart." };
  }

  // Remove the item from the cart
  await prisma.cartItem.delete({
    where: {
      id: Number(itemCartId),
    },
  });
  revalidatePath("/bag");
  return { message: "Item removed from cart." };
}

export async function checkOut(formData: FormData) {
  const selectedOption = formData.get("paymentOption");
  if (selectedOption === "option-one") {
    return redirect("/checkout");
  } else {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      let guestcart: GuestCart = await getGuestCartt();
      const products = await getProductsFromGuestCart(guestcart);
      const cartWithQuantities = products?.map((product) => {
        const cartItem = guestcart.items.find(
          (item) => item.productId === product.id
        );
        return {
          ...product,
          quantity: cartItem?.quantity || 1,
        };
      });
      if (guestcart && guestcart.items) {
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
          cartWithQuantities.map((item) => ({
            price_data: {
              currency: "aed",
              unit_amount: item.NewPrice
                ? item.NewPrice * 100
                : item.price * 100,
              product_data: {
                name: item.name,
                images: [item.images[0]],
              },
            },
            quantity: item.quantity,
          }));
        const cartItemsSimple = guestcart.items.map((item) => ({
          id: item.productId,
          quantity: item.quantity,
        }));
        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          line_items: lineItems,
          // Specify the payment method type
          billing_address_collection: "required",

          success_url:
            process.env.NODE_ENV === "development"
              ? `${process.env.KINDE_SITE_URL}/payment/success`
              : `${process.env.DEPLOYMENT_URL}/payment/success`,
          cancel_url:
            process.env.NODE_ENV === "development"
              ? `${process.env.KINDE_SITE_URL}/payment/cancel`
              : `${process.env.DEPLOYMENT_URL}/payment/cancel`,

          metadata: {
            cartItems: JSON.stringify(cartItemsSimple),
          },
          phone_number_collection: {
            enabled: true,
          },
          //customer_email: user.email,
        });
        clearCart();
        return redirect(session.url as string);
      }
    }
    // let cart: Cart | null = await redis.get(`cart-${user.id}`);

    if (user) {
      let cart = await getCart();
      if (cart && cart.items) {
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
          cart.items.map((item) => ({
            price_data: {
              currency: "usd",
              unit_amount: item.product.NewPrice
                ? item.product.NewPrice * 100
                : item.product.price * 100,
              product_data: {
                name: item.product.name,
                images: [item.product.images[0]],
              },
            },
            quantity: item.quantity,
          }));
        const cartItemsSimple = cart.items.map((item) => ({
          id: item.product.id,
          quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          line_items: lineItems,
          // Specify the payment method type
          billing_address_collection: "required",

          success_url:
            process.env.NODE_ENV === "development"
              ? `${process.env.KINDE_SITE_URL}/payment/success`
              : `${process.env.DEPLOYMENT_URL}/payment/success`,
          cancel_url:
            process.env.NODE_ENV === "development"
              ? `${process.env.KINDE_SITE_URL}/payment/cancel`
              : `${process.env.DEPLOYMENT_URL}/payment/cancel`,

          metadata: {
            userId: user.id,
            customer_email: user.email,
            cartItems: JSON.stringify(cartItemsSimple),
          },
          phone_number_collection: {
            enabled: true,
          },
          //customer_email: user.email,
        });

        return redirect(session.url as string);
      }
    }
  }
}

export async function buyNow(
  productId: string,
  quantity: number,
  option: string
) {
  if (option === "option-one") {
    return redirect(
      `/order-now?productId=${encodeURIComponent(
        productId
      )}&quantity=${encodeURIComponent(quantity)}`
    );
  } else {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (product) {
      const cartItemsSimple = {
        id: product.id,
        quantity: quantity,
      };

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "aed",
              unit_amount: product.NewPrice
                ? product.NewPrice * 100
                : product.price * 100,
              product_data: {
                name: product.name,
                images: [product.images[0]],
              },
            },
            quantity: quantity,
          },
        ],
        billing_address_collection: "required",

        success_url:
          process.env.NODE_ENV === "development"
            ? `${process.env.KINDE_SITE_URL}/payment/success`
            : `${process.env.DEPLOYMENT_URL}/payment/success`,
        cancel_url:
          process.env.NODE_ENV === "development"
            ? `${process.env.KINDE_SITE_URL}/payment/cancel`
            : `${process.env.DEPLOYMENT_URL}/payment/cancel`,

        metadata: {
          userId: user?.id || "",
          customer_email: user?.email || "",
          cartItems: JSON.stringify(cartItemsSimple),
        },
        phone_number_collection: {
          enabled: true,
        },
        //customer_email: user.email,
      });

      return redirect(session.url as string);
    }
  }
}

export const searchProducts = async (query: string) => {
  if (!query) return [];
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  });
  return products;
};

export async function clearCart() {
  const guestCart = getGuestCartt();

  if (guestCart?.items) {
    // Iterate over each item and remove it
    guestCart.items.forEach((item: CartGuestItem) => {
      guestCart.items = guestCart.items.filter(
        (cartItem: CartGuestItem) => cartItem.productId !== item.productId
      );
    });
  }

  // Save the updated (empty) cart
  const updatedGuestCart: GuestCart = {
    items: [],
  };
  saveGuestCart(updatedGuestCart);
}

export const toggleLike = async (
  productId: string,

  liked: boolean
) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }
  console.log(liked);
  try {
    if (liked) {
      await prisma.like.create({
        data: {
          productId,
          userId: user.id,
        },
      });
    } else {
      await prisma.like.deleteMany({
        where: {
          productId,
          userId: user.id,
        },
      });
    }
  } catch (error) {
    console.error("Error updating like status:", error);
  }
};

export async function getUserLikeStatus(
  productId: string,
  userId: string | undefined
) {
  const liked = await prisma.like.findFirst({
    where: {
      productId,
      userId,
    },
  });

  return liked ? true : false;
}

export async function delWhisListItem(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    const productId = formData.get("itemCartId") as string;
    if (productId) {
      removeFromGuestWishlist(productId);
      revalidatePath("/whishlist");
    }
    return;
  }

  const itemCartId = formData.get("itemCartId");

  if (!itemCartId) {
    return { message: "Item not found in whishlist." };
  }
  console.log(itemCartId);
  // Remove the item from the cart
  await prisma.like.delete({
    where: {
      id: Number(itemCartId),
    },
  });
  revalidatePath("/whishlist");
  return { message: "Item removed from whishlist." };
}

const generateOrderNumber = () => {
  const prefix = "Order_A";
  const uniqueId = uuidv4().slice(0, 8);

  return `${prefix}${uniqueId}`;
};
