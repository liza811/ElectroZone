import { delWhisListItem } from "@/app/actions";
import Image from "next/image";
import { RemoveItem } from "../SubmitButtons";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface cartItemInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  NewPrice: number | null;
  image: string;
  isGuest: boolean;
  cartId?: number;
}

export const WhishListItem = ({
  id,
  name,
  cartId,
  NewPrice,
  description,
  image,
  isGuest,
  price,
}: cartItemInterface) => {
  return (
    <div
      // href={`/product/${id}`}
      className="min-w-full flex  border bg-neutral-50 p-1"
    >
      <div className="w-24 h-24 sm:w-28 sm:h-28 relative  rounded-md">
        <Image
          className="rounded-md object-cover"
          fill
          src={image}
          alt="Product image"
        />
      </div>
      <div className="ml-5 flex flex-1 justify-between w-full font-medium py-2 ">
        <div className="flex flex-col  gap-y-3">
          <p className="max-w-md line-clamp-2 ">{name}</p>
          <p className="text-sm text-slate-600 text-[13px] max-w-sm  line-clamp-2 ">
            {description}
          </p>
        </div>
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-center gap-x-2">
            {!!NewPrice ? (
              <div className="h-fit flex flex-row-reverse gap-x-2 min-w-fit items-center gap-y-2 ">
                <h3 className="inline-flex items-center rounded-md bg-red-500/10 px-2 py-1 text-sm font-medium text-red-500 ring-1 ring-inset ring-red-500/10">
                  {NewPrice} AED
                </h3>
                <p className="text-slate-600 text-sm line-through">
                  {" "}
                  {price} AED
                </p>
              </div>
            ) : (
              <h3 className="inline-flex items-center min-w-fit rounded-md bg-primary/10 px-2 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/10">
                {price} AED
              </h3>
            )}
          </div>
          {isGuest ? (
            <form action={delWhisListItem} className="text-end">
              <input type="hidden" name="itemCartId" value={id} />
              <RemoveItem />
            </form>
          ) : (
            <form action={delWhisListItem} className="text-end">
              <input type="hidden" name="itemCartId" value={cartId} />
              <RemoveItem />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const EmptyWhishlist = () => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-20">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <Heart className="w-10 h-10 text-primary" />
      </div>

      <h2 className="mt-6 text-xl font-semibold">
        You dont have any products in your WhishList
      </h2>
      <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
        You currently dont have any products in your WhishList. Please add some
        so that you can see them right here.
      </p>

      <Button asChild>
        <Link href="/">Shop Now!</Link>
      </Button>
    </div>
  );
};
