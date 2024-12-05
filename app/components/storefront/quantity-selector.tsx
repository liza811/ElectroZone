"use client";

import { useState, useTransition } from "react";
import { addItem, buyNow } from "@/app/actions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import { SelectOption } from "../dashboard/delete-banner";

interface QuantitySelectorProps {
  productId: string;
  totalQuantity: number;
  outOfStock: boolean;
}

export default function QuantitySelector({
  productId,
  totalQuantity,
  outOfStock,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const [, startTransition] = useTransition();

  const disabledPlus = quantity === totalQuantity || totalQuantity == 0;
  const disabledMinus = quantity === 1;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    startTransition(() => {
      addItem(productId, quantity).finally(() => {
        setIsAddingToCart(false);
      });
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
            (disabledPlus || outOfStock) && "text-slate-500"
          )}
          onClick={() => handleQuantityChange(1)}
          disabled={disabledPlus || outOfStock}
        >
          +
        </button>
      </div>
      <div className="w-full flex justify-center mt-3">
        <Button
          size="lg"
          className="w-[80%] mt-5"
          onClick={handleAddToCart}
          disabled={isAddingToCart || outOfStock}
        >
          {isAddingToCart ? (
            <>
              <Loader2 className="mr-4 h-5 w-5 animate-spin" /> Adding...
            </>
          ) : (
            <>
              <ShoppingBag className="mr-4 h-5 w-5" /> Add to Cart
            </>
          )}
        </Button>
      </div>
      <div className="w-full flex justify-center">
        <SelectOption
          outOfStock={outOfStock}
          productId={productId}
          quantity={quantity}
        />
      </div>
    </div>
  );
}
