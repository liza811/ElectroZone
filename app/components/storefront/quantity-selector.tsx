"use client";

import { useState, useTransition } from "react";
import { addItem } from "@/app/actions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";

interface QuantitySelectorProps {
  productId: string;
  totalQuantity: number;
}

export default function QuantitySelector({
  productId,
  totalQuantity,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();
  const disabledPlus = quantity === totalQuantity;
  const disabledMinus = quantity === 1;
  const handleQuantityChange = (delta: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  const handleAddToCart = () => {
    startTransition(() => {
      addItem(productId, quantity);
    });
  };

  return (
    <div>
      <div className="rounded-md border border-slate-400 overflow-hidden mt-6 w-fit h-12 flex items-center">
        <button
          type="button"
          className={cn(
            "border-r border-slate-400 font-semibold text-[20px] px-6 h-full",
            disabledMinus && "text-slate-500"
          )}
          onClick={() => handleQuantityChange(-1)}
          disabled={disabledMinus}
        >
          -
        </button>
        <span className="justify-center flex items-center font-semibold text-[20px] px-6 w-12 h-full">
          {quantity}
        </span>
        <button
          type="button"
          className={cn(
            "border-l border-slate-400 font-semibold text-[20px] px-6 h-full",
            disabledPlus && "text-slate-500"
          )}
          onClick={() => handleQuantityChange(1)}
          disabled={disabledPlus}
        >
          +
        </button>
      </div>
      <div className="w-full flex justify-center mt-3">
        {isPending ? (
          <Button disabled size="lg" className="w-[80%] mt-5">
            <Loader2 className="mr-4 h-5 w-5 animate-spin" /> Adding...
          </Button>
        ) : (
          <Button
            size="lg"
            className="w-[80%] mt-5 "
            type="submit"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="mr-4 h-5 w-5" /> Add to Cart
          </Button>
        )}
      </div>
      {/* <button
        onClick={handleAddToCart}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        disabled={isPending}
      >
        {isPending ? "Adding..." : "Add to Cart"}
      </button> */}
    </div>
  );
}
