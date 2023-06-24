import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  try {
    const body = await request.json();
    const { name, number, country, state, city, job, funFact, language } = body;

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name,
        number: parseInt(number, 10), // Converted the string to an integer
        country,
        state,
        city,
        job,
        funFact,
        language,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.error();
  }
}
