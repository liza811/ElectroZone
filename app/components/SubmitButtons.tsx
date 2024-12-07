"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, ShoppingBag, Trash2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";

interface buttonProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "black"
    | null
    | undefined;
}

export function SubmitButton({ text, variant }: buttonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          disabled
          className={cn(
            "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
            variant === "black" && "bg-black hover:bg-black/90"
          )}
        >
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button
          className={cn(
            "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
            variant === "black" && "bg-black hover:bg-black/90"
          )}
          type="submit"
        >
          {text}
        </Button>
      )}
    </>
  );
}

export function ShoppingBagButton() {
  const { pending } = useFormStatus();
  //TODO UPDATE THE CART AMOUNT
  return (
    <div className="w-full flex justify-center mt-3">
      {pending ? (
        <Button disabled size="lg" className="w-[80%] mt-5">
          <Loader2 className="mr-4 h-5 w-5 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button size="lg" className="w-[80%] mt-5 " type="submit">
          <ShoppingBag className="mr-4 h-5 w-5" /> Add to Cart
        </Button>
      )}
    </div>
  );
}

export function DeleteItem() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <button disabled className="font-medium text-red-500 text-end">
          Removing...
        </button>
      ) : (
        <button type="submit" className="font-medium text-red-500 text-end">
          Delete
        </button>
      )}
    </>
  );
}

export function RemoveItem() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <button
          disabled
          className="font-medium text-red-500 text-end"
          title="remove"
        >
          <Loader2 className="mr-4 h-5 w-5 animate-spin" />
        </button>
      ) : (
        <button
          type="submit"
          className="font-medium text-red-500 text-end"
          title="remove"
        >
          <Trash2Icon />
        </button>
      )}
    </>
  );
}
export function ChceckoutButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          disabled
          size="lg"
          className="w-full mt-5 bg-black hover:bg-black/80"
        >
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button
          type="submit"
          size="lg"
          className="w-full mt-5 bg-black hover:bg-black/80"
        >
          Continue
        </Button>
      )}
    </>
  );
}
