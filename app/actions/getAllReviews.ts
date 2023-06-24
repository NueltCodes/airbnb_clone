import prisma from "@/app/libs/prismadb";

interface IParams {
  userId?: string;
}

export default async function getAllReviews(params: IParams) {
  try {
    const { userId } = params;
    const query: any = {};
    if (userId) {
      query.userId = userId;
    }

    // we first are to fetch the listings
    const listings = await prisma.listing.findMany({
      where: query,
    });

    const reviews: any[] = [];

    //  Iterating over the listings and fetch reviews for each listing
    for (const listing of listings) {
      const listingReviews = await prisma.review.findMany({
        where: {
          listingId: listing.id,
        },
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      reviews.push(
        ...listingReviews.map((review) => ({
          ...review,
          createdAt: review.createdAt.toISOString(),
          userName: review.user?.name,
          userImage: review.user?.image,
        }))
      );
    }

    return reviews;
  } catch (error) {
    throw new Error("Failed to fetch reviews");
  }
}
