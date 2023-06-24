import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  eventId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { eventId } = params;

  if (!eventId || typeof eventId !== "string") {
    throw new Error("Invalid ID");
  }

  const event = await prisma.event.deleteMany({
    where: {
      id: eventId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(event);
}
