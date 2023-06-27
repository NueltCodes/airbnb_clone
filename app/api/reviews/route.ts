import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Prisma } from "@prisma/client";

// Create a review for a listing
export async function createReview(
  rating: number,
  comment: string,
  listingId: string,
  userId: string
) {
  try {
    const newReview = await prisma.review.create({
      data: {
        rating,
        comment,
        listing: {
          connect: { id: listingId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });

    return newReview;
  } catch (error) {
    throw new Error("Failed to create review");
  }
}

// Update average ratings for a listing
export async function updateAverageRatings(listingId: string) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        reviews: true,
      },
    });

    if (!listing) {
      throw new Error("Listing not found");
    }

    const totalRatings = listing.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = totalRatings / listing.reviews.length;

    await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        ratings: averageRating,
      },
    });
  } catch (error) {
    throw new Error("Failed to update average ratings");
  }
}

// Usage in your POST route
export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { rating, comment, listingId, userId } = body;

  if (!rating || !listingId || !userId) {
    return NextResponse.error();
  }

  try {
    const review = await createReview(rating, comment, listingId, userId);

    await updateAverageRatings(listingId);

    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.error();
  }
}
