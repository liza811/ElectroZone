"use client";

import { buyNow } from "@/app/actions";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { BaggageClaim, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";

interface SelectOptionProps {
  productId: string;
  quantity: number;
  outOfStock: boolean;
}
export function SelectOption({
  outOfStock,
  productId,
  quantity,
}: SelectOptionProps) {
  const [isPending, startTransition] = useTransition();
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [selectedOption, setSelectedOption] = useState("option-one");
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  const handleBuy = () => {
    setIsBuyingNow(true);
    startTransition(() => {
      buyNow(productId, quantity, selectedOption).finally(() => {
        setIsBuyingNow(false);
      });
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="lg"
          className="w-[80%] mt-5"
          disabled={isBuyingNow || outOfStock}
        >
          <BaggageClaim className="mr-4 h-5 w-5" /> Buy it Now
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[330px] md:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Choose thz right option for you.</AlertDialogTitle>
          <AlertDialogDescription>
            Do you want to Pay Now or At Delevery?
          </AlertDialogDescription>
          <div className="mt-6 flex flex-col md:flex-row gap-y-2 justify-between w-full items-center">
            {/* Option One */}
            <div className="flex items-center space-x-2 border border-gray-200 px-6 py-2 rounded-md">
              <input
                type="radio"
                id="option-one"
                name="paymentOption"
                value="option-one"
                checked={selectedOption === "option-one"}
                onChange={handleOptionChange}
                className="cursor-pointer"
              />
              <label htmlFor="option-one" className="font-bold cursor-pointer">
                Cash On Delivery
              </label>
            </div>
            {/* Option Two */}
            <div className="flex items-center space-x-2 border border-gray-200 rounded-md px-6 py-2">
              <input
                type="radio"
                id="option-two"
                name="paymentOption"
                value="option-two"
                checked={selectedOption === "option-two"}
                onChange={handleOptionChange}
                className="cursor-pointer"
              />
              <label
                htmlFor="option-two"
                className="font-bold text-purple-900 text-base pointer"
              >
                Pay On Ligne
              </label>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <Button
            className="cursor-pointer w-full md:w-[100px] min-w-fit bg-primary hover:bg-primary-500/95"
            name="select"
            title="select"
            onClick={handleBuy}
            disabled={isPending}
          >
            {isBuyingNow ? (
              <>
                <Loader2 className="mr-4 h-5 w-5 animate-spin" /> Please wait...
              </>
            ) : (
              <>Choose</>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
