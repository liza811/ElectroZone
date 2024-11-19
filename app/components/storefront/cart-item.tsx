import { delItem } from "@/app/actions";
import Image from "next/image";
import { DeleteItem } from "../SubmitButtons";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface cartItemInterface {
  id?: number;
  productId?: string;
  quantity: number;
  name: string;
  image: string;
  price: number;
  newPrice: number | null;
  isGuest: boolean;
}

export const CartItem = ({
  id,
  name,

  quantity,
  image,
  newPrice,
  isGuest,
  productId,
  price,
}: cartItemInterface) => {
  return (
    <>
      <div className="w-24 h-24 sm:w-32 sm:h-32 relative border rounded-md">
        <Image
          className="rounded-md object-cover"
          fill
          src={image}
          alt="Product image"
        />
      </div>
      <div className="ml-5 flex justify-between w-full font-medium ">
        <p className="max-w-md line-clamp-2">{name}</p>
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-center gap-x-2">
            <p>{quantity} x</p>

            <p>{newPrice ? `$${newPrice}` : `$${price}`}</p>
          </div>
          {isGuest ? (
            <form action={delItem} className="text-end">
              <input type="hidden" name="itemCartId" value={productId} />
              <DeleteItem />
            </form>
          ) : (
            <form action={delItem} className="text-end">
              <input type="hidden" name="itemCartId" value={id} />
              <DeleteItem />
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export const EmptyCart = () => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-20">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <ShoppingBag className="w-10 h-10 text-primary" />
      </div>

      <h2 className="mt-6 text-xl font-semibold">
        You dont have any products in your Bag
      </h2>
      <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
        You currently dont have any products in your shopping bag. Please add
        some so that you can see them right here.
      </p>

      <Button asChild>
        <Link href="/">Shop Now!</Link>
      </Button>
    </div>
  );
};
