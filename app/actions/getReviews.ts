import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export default async function getReviews(params: IParams) {
  try {
    const { listingId } = params;
    const query: any = {};
    if (listingId) {
      query.listingId = listingId;
    }

    const reviews = await prisma.review.findMany({
      where: query,
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

    const safeReviews = reviews.map((review) => ({
      ...review,
      createdAt: review.createdAt.toISOString(),
      userName: review.user?.name,
      userImage: review.user?.image,
    }));

    return safeReviews;
  } catch (error) {
    throw new Error("Failed to fetch reviews");
  }
}
