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

    const listings = await prisma.listing.findMany({
      where: query,
      include: {
        reviews: {
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
        },
      },
    });

    const safeReviews: any[] = [];

    for (const listing of listings) {
      for (const review of listing.reviews) {
        safeReviews.push({
          ...review,
          createdAt: review.createdAt.toISOString(),
          userName: review.user?.name,
          userImage: review.user?.image,
        });
      }
    }

    return safeReviews;
  } catch (error) {
    throw new Error("Failed to fetch reviews");
  }
}
