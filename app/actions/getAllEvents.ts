import prisma from "@/app/libs/prismadb";

interface IParams {
  userId?: string;
}

export default async function getAllEvents(params: IParams) {
  try {
    const { userId } = params;

    const query: any = {};
    if (userId) {
      query.userId = userId;
    }

    const events = await prisma.event.findMany({
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

    const safeEvents = events.map((event) => ({
      ...event,
      createdAt: event.createdAt.toISOString(),
      userName: event.user?.name,
      userImage: event.user?.image,
    }));

    return safeEvents;
  } catch (error) {
    throw new Error("Failed to fetch events");
  }
}
