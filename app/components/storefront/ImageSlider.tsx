"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface iAppProps {
  images: string[];
}

export function ImageSlider({ images }: iAppProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  function handlePreviousClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }

  function handleNextClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }

  function handleImageClick(index: number) {
    setMainImageIndex(index);
  }

  return (
    <div className="grid gap-6 md:gap-3 items-start">
      <div className="relative overflow-hidden rounded-lg max-w-[500px] mx-auto">
        <Image
          width={600}
          height={600}
          src={images[mainImageIndex]}
          alt="Product image"
          className="object-contain w-full h-auto max-w-[400px] max-h-[400px] sm:max-w-[450px] sm:max-h-[450px] "
        />
        <div className="absolute inset-0 flex items-center justify-between ">
          <Button
            onClick={handlePreviousClick}
            variant="ghost"
            size="icon"
            className={cn(
              "-ml-1 hover:bg-transparent block",
              mainImageIndex === 0 && "hidden"
            )}
          >
            <ChevronLeft className="w-6 h-6 " />
          </Button>
          <Button
            onClick={handleNextClick}
            variant="ghost"
            size="icon"
            className={cn(
              "ml-auto pl-4 hover:bg-transparent block",
              mainImageIndex === images.length - 1 && "hidden"
            )}
          >
            <ChevronRight className="w-6 h-6 " />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div
            className={cn(
              "p-0 w-[100px] h-[100px]",
              index === mainImageIndex
                ? "border-2 border-primary"
                : "border border-gray-200",
              "relative overflow-hidden rounded-lg cursor-pointer"
            )}
            key={index}
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={image}
              alt="Product Image"
              width={100}
              height={100}
              className="object-cover w-[100px] h-[100px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
