import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Checkout } from "./checkout";
import { getCart, getGuestCartt, getProductsFromGuestCart2 } from "@/lib/cart";

const Delivery = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  let cart;
  let totalPrice = 0;
  let cartWithQuantities = [];
  if (!user) {
    cart = await getGuestCartt();

    const products = await getProductsFromGuestCart2(cart);
    cartWithQuantities = products?.map((product) => {
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
    cart = await getCart();
  }

  return (
    <Checkout
      total={new Intl.NumberFormat("en-US").format(totalPrice)}
      products={cartWithQuantities}
    />
  );
};

export default Delivery;
