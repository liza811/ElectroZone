import { notFound } from "next/navigation";
import { Order } from "./order";

const OrderNow = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const productId = searchParams.productId;
  const quantity = searchParams.quantity;
  if (!productId || !quantity) {
    notFound();
  }
  return <Order productId={productId} quantity={Number(quantity)} />;
};

export default OrderNow;
