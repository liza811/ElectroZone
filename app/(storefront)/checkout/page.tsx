import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Checkout } from "./checkout";
import {
  getGuestCartt,
  getMinimalCart,
  getProductsFromGuestCart2,
} from "@/lib/cart";

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
        //@ts-ignore
        const cartItem = cart.items.find(
          //@ts-ignore
          (item) => item.productId === product.product.id
        );
        return {
          //@ts-ignore
          ...product.product,
          quantity: cartItem?.quantity || 1,
        };
      }) || [];
    cartWithQuantities.forEach((item) => {
      const productPrice = item.NewPrice || item.price;
      totalPrice += (productPrice || 0) * item.quantity;
    });
  }

  return (
    <Checkout
      total={new Intl.NumberFormat("en-US").format(totalPrice)}
      //@ts-ignore
      products={cartWithQuantities}
    />
  );
};

export default Delivery;
