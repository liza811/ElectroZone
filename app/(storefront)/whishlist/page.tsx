import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { unstable_noStore as noStore } from "next/cache";

import {
  getGuestWishlist,
  getProductsFromGuestWhishList,
  getWhisList,
} from "@/lib/cart";
import { EmptyCart } from "@/app/components/storefront/cart-item";
import {
  EmptyWhishlist,
  WhishListItem,
} from "@/app/components/storefront/whishlist-item";

export default async function BagRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    const guestCart = await getGuestWishlist();

    if (!guestCart || guestCart.length === 0) {
      <div className="max-w-2xl mx-auto mt-10 min-h-[55vh]">
        <EmptyWhishlist />
      </div>;
    } else {
      const products = await getProductsFromGuestWhishList(guestCart);

      return (
        <div className="flex flex-col gap-y-3 max-w-3xl mx-auto mt-10 min-h-[55vh]">
          {products?.map((item) => (
            <div key={item.id} className="flex">
              <WhishListItem
                id={item.id}
                image={item.images[0]}
                name={item.name}
                description={item.description}
                NewPrice={item.NewPrice}
                price={item.price}
                isGuest
              />
            </div>
          ))}
        </div>
      );
    }
  }

  const cart = await getWhisList();

  return (
    <div className="max-w-2xl mx-auto mt-10 min-h-[55vh]">
      {!cart || cart.length === 0 ? (
        <EmptyWhishlist />
      ) : (
        <div className="flex flex-col gap-y-10 max-w-3xl mx-auto mt-10 min-h-[55vh]">
          {cart?.map((item) => (
            <div key={item.product.id} className="flex">
              <WhishListItem
                cartId={item.id}
                id={item.product.id}
                image={item.product.images[0]}
                name={item.product.name}
                description={item.product.description}
                NewPrice={item.product.NewPrice}
                price={item.product.price}
                isGuest={false}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
