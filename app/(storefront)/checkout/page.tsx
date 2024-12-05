import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Checkout } from "./checkout";
import {
  getGuestCartt,
  getMinimalCart,
  getProductsFromGuestCart2,
} from "@/lib/cart";
import { redirect } from "next/navigation";

// Define types for cart and products
interface Product {
  id: string;
  price: number;
  NewPrice?: number;
}

interface CartItem {
  productId: string;
  quantity: number;
}

interface Cart {
  items: CartItem[];
}

interface CartWithQuantities extends Product {
  quantity: number;
}

const Delivery = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  let cart: Cart | null;
  let totalPrice = 0;
  let cartWithQuantities: CartWithQuantities[] = [];

  if (!user) {
    cart = await getGuestCartt();

    const products = await getProductsFromGuestCart2(cart);
    //@ts-ignore
    cartWithQuantities = products.map((product) => {
      //@ts-ignore
      const cartItem = cart.items.find((item) => item.productId === product.id);
      return {
        ...product,
        quantity: cartItem?.quantity || 1,
      };
    });
    cartWithQuantities.forEach((item) => {
      const productPrice = item.NewPrice || item.price;
      totalPrice += (productPrice || 0) * item.quantity;
    });
  } else {
    //@ts-ignore
    cart = await getMinimalCart();

    cartWithQuantities =
      cart?.items.map((product) => {
        return {
          //@ts-ignore
          ...product.product,
          quantity: product?.quantity || 1,
        };
      }) || [];
    cartWithQuantities.forEach((item) => {
      const productPrice = item.NewPrice || item.price;
      totalPrice += (productPrice || 0) * item.quantity;
    });
  }
  if (!cartWithQuantities || !totalPrice) {
    redirect("/");
  }
  return (
    <Checkout
      total={totalPrice}
      //@ts-ignore
      products={cartWithQuantities}
    />
  );
};

export default Delivery;
