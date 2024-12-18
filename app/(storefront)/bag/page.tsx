import { checkOut } from "@/app/actions";
import { ChceckoutButton } from "@/app/components/SubmitButtons";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { unstable_noStore as noStore } from "next/cache";

import { getCart, getGuestCart, getProductsFromGuestCart } from "@/lib/cart";
import { CartItem, EmptyCart } from "@/app/components/storefront/cart-item";

export default async function BagRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    const guestCart = await getGuestCart();

    if (!guestCart || !guestCart.items || guestCart.items.length === 0) {
      <div className="max-w-2xl mx-auto mt-10 min-h-[55vh]">
        <EmptyCart />
      </div>;
    } else {
      let totalPrice = 0;

      const products = await getProductsFromGuestCart(guestCart);
      const cartWithQuantities = products?.map((product) => {
        const cartItem = guestCart.items.find(
          (item) => item.productId === product.id
        );
        return {
          ...product,
          quantity: cartItem?.quantity || 1,
        };
      });
      cartWithQuantities.forEach((item) => {
        const productPrice = item.NewPrice || item.price;
        totalPrice += (productPrice || 0) * item.quantity;
      });

      return (
        <div className="flex flex-col gap-y-10 max-w-2xl mx-auto mt-10 min-h-[55vh]">
          {cartWithQuantities?.map((item) => (
            <div key={item.id} className="flex">
              <CartItem
                productId={item.id}
                image={item.images[0]}
                name={item.name}
                newPrice={item.NewPrice}
                price={item.price}
                quantity={item.quantity}
                isGuest
              />
            </div>
          ))}
          <div className="mt-10">
            <div className="flex items-center justify-between font-medium">
              <p>Subtotal:</p>
              <p>{new Intl.NumberFormat("en-US").format(totalPrice)} AED</p>
            </div>

            <form action={checkOut}>
              {/* <div className="mt-6 flex justify-between w-full items-center">
                <div className="flex items-center space-x-2 border border-gray-200  px-6 py-2 rounded-md ">
                  <input
                    type="radio"
                    id="option-one"
                    name="paymentOption"
                    value="option-one"
                    defaultChecked
                    className=" cursor-pointer"
                  />
                  <label
                    htmlFor="option-one"
                    className="font-bold cursor-pointer"
                  >
                    Cash On Delivery
                  </label>
                </div>
                <div className="flex items-center space-x-2 border border-gray-200 rounded-md px-6 py-2">
                  <input
                    type="radio"
                    id="option-two"
                    name="paymentOption"
                    value="option-two"
                    className=" cursor-pointer"
                  />
                  <label
                    htmlFor="option-two"
                    className="font-bold text-purple-900 text-base pointer"
                  >
                    Pay On Ligne
                  </label>
                </div>
              </div> */}
              <input
                type="radio"
                id="option-one"
                name="paymentOption"
                value="option-one"
                defaultChecked
                className=" cursor-pointer hidden"
              />
              <ChceckoutButton />
            </form>
          </div>
        </div>
      );
    }
  }

  const cart = await getCart();

  let totalPrice = 0;

  if (cart && cart.items) {
    cart.items.forEach((item) => {
      const productPrice = item.product?.NewPrice || item.product?.price;
      totalPrice += (productPrice || 0) * item.quantity;
    });
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 min-h-[55vh] mb-3">
      {!cart || !cart.items || cart.items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col gap-y-10 max-w-2xl mx-auto mt-10 min-h-[55vh]">
          {cart?.items.map((item) => (
            <div key={item.id} className="flex">
              <CartItem
                id={item.id}
                image={item.product.images[0]}
                name={item.product.name}
                newPrice={item.product.NewPrice}
                price={item.product.price}
                quantity={item.quantity}
                isGuest={false}
              />
            </div>
          ))}
          <div className="">
            <div className="flex items-center justify-between font-medium">
              <p>Subtotal:</p>
              <p>${new Intl.NumberFormat("en-US").format(totalPrice)}</p>
            </div>

            <form action={checkOut}>
              {/* <div className="mt-6 flex justify-between gap-x-1 w-full items-center">
                <div className="flex items-center space-x-2 border border-gray-200  px-6 py-2 rounded-md ">
                  <input
                    type="radio"
                    id="option-one"
                    name="paymentOption"
                    value="option-one"
                    defaultChecked
                    className=" cursor-pointer"
                  />
                  <label
                    htmlFor="option-one"
                    className="font-bold cursor-pointer text-sm md:text-base"
                  >
                    Cash On Delivery
                  </label>
                </div>
                <div className="flex items-center space-x-2 border border-gray-200 rounded-md px-6 py-2">
                  <input
                    type="radio"
                    id="option-two"
                    name="paymentOption"
                    value="option-two"
                    className=" cursor-pointer"
                  />
                  <label
                    htmlFor="option-two"
                    className="font-bold text-purple-900 text-sm md:text-base pointer"
                  >
                    Pay on Ligne
                  </label>
                </div>
              </div> */}
              <input
                type="radio"
                id="option-one"
                name="paymentOption"
                value="option-one"
                defaultChecked
                className=" cursor-pointer hidden"
              />
              <ChceckoutButton />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
