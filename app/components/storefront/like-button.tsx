"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toggleLike } from "@/app/actions";

import { cn } from "@/lib/utils";

interface LikeButtonProps {
  productId: string;
  isGuest: boolean;
  liked: boolean;
}
export const LikeButton = ({ productId, isGuest, liked }: LikeButtonProps) => {
  const [like, setLiked] = useState(liked);

  useEffect(() => {
    if (isGuest) {
      const likedItems = Cookies.get("likedItems");
      const likedItemsParsed = likedItems ? JSON.parse(likedItems) : [];

      setLiked(
        likedItemsParsed.some(
          (item: { productId: string }) => item.productId === productId
        )
      );
    }
  }, [productId]);
  const handleClick = () => {
    if (isGuest) {
      const likedItems = Cookies.get("likedItems");
      let likedItemsParsed = likedItems ? JSON.parse(likedItems) : [];

      const isLiked = likedItemsParsed.some(
        (item: { productId: string }) => item.productId === productId
      );

      if (isLiked) {
        likedItemsParsed = likedItemsParsed.filter(
          (item: { productId: string }) => item.productId !== productId
        );
      } else {
        likedItemsParsed.push({ productId });
      }

      Cookies.set("likedItems", JSON.stringify(likedItemsParsed));

      setLiked(!isLiked);
    } else {
      toggleLike(productId, !like).finally(() => {});
      setLiked(!like);
    }
  };

  return (
    <div className="like-button -mt-4 -mr-3">
      <div className="heart-bg">
        <div
          className={cn(
            "heart-icon hover:scale-110 transition",
            like && "liked"
          )}
          onClick={handleClick}
        ></div>
      </div>
    </div>
  );
};
