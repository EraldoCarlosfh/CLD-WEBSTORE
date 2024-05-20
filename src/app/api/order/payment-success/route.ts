import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { toast } from "react-toastify";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET_KEY, {
  apiVersion: "2024-04-10",
});

export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature");

  if (!signature)
    return toast.success(`No signature`, {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
      pauseOnHover: false,
    });

  const text = await request.text();

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET_KEY,
  );

  if (event.type == "checkout.session.completed") {
    const session = event.data.object as any;

    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ["line_items"],
      },
    );
    const lineItems = sessionWithLineItems.line_items;

    console.log(lineItems);

    // ATUALIZAR PEDIDO
    await prismaClient.orders.update({
      where: {
        id: session.metadata.orderId,
      },
      data: {
        status: "PAYMENT_CONFIRMED",
      },
    });
  }

  return NextResponse.json({ received: true });
};
