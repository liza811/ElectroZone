import prisma from "@/app/lib/db";

import { stripe } from "@/app/lib/stripe";
import { clearCart } from "@/lib/cart";
import { cookies, headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_SECRET_WEBHOOK as string
    );
  } catch (error: unknown) {
    return new Response("Webhook Error", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      // Parse the cart items from metadata
      let cartItemss = session.metadata
        ? JSON.parse(session.metadata.cartItems)
        : [];
      if (!Array.isArray(cartItemss)) {
        cartItemss = [cartItemss];
      }

      const userId = session.metadata?.userId || null;
      const email = session.customer_details?.email;
      const phone = session.customer_details?.phone;
      const customerName = session.customer_details?.name;
      const billingAddress = session.customer_details?.address;

      await prisma.order.create({
        data: {
          amount: session.amount_total as number,
          status: session.status as string,
          userId: userId,
          guestPhone: phone,
          guestEmail: email,
          guestName: customerName,
          billingAddressLine1: billingAddress?.line1,
          billingAddressLine2: billingAddress?.line2,
          billingCity: billingAddress?.city,

          billingPostalCode: billingAddress?.postal_code,
          billingCountry: billingAddress?.country,
          orderItems: {
            create: cartItemss.map(
              (item: { id: String; quantity: number }) => ({
                productId: item.id,
                quantity: item.quantity,
              })
            ),
          },
        },
      });

      if (userId) {
        await prisma.cart.delete({
          where: {
            userId: userId,
          },
        });
      } else {
        clearCart();
      }
      break;
    }
    default: {
      console.log("unhandled event");
    }
  }

  return new Response(null, { status: 200 });
}
