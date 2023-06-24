import { NextApiResponse, NextApiRequest } from "next";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return res.status(400).json({ error: "User not found" });
    }

    const { listingId, startDate, endDate, paymentData } = req.body;

    if (!listingId || !startDate || !endDate || !paymentData) {
      return res.status(400).json({ error: "Invalid request" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentData.amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    await prisma.listing.update({
      where: { id: listingId },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice: paymentData.amount,
          },
        },
      },
    });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
