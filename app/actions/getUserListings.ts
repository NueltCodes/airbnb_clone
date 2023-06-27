import prisma from "@/app/libs/prismadb";

interface IParams {
  searchParams?: string;
}
export default async function getUserListings(params: IParams) {
  try {
    const { searchParams } = params;

    const listings = await prisma.listing.findMany({
      where: {
        userId: searchParams,
      },
      include: {
        user: true,
      },
    });

    if (!listings) {
      return [];
    }

    const safeListing = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified: listing.user.emailVerified?.toString() || null,
      },
    }));

    return safeListing;
  } catch (error: any) {
    throw new Error(error);
  }
}
