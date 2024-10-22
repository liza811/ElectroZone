export type Cart = {
  userId: string;
  items: Array<{
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    // imageString: string;
  }>;
};

export interface CartGuestItem {
  productId: string;
  quantity: number;
}

export interface GuestCart {
  items: CartGuestItem[];
}
