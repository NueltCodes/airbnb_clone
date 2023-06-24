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
    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
      checkIn,
      checkOut,
      startDate,
      endDate,
      houseRules,
      perks,
      amenities,
      safetyGuide,
    } = body;

    if (!title || !description || !category || !price) {
      return NextResponse.error();
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location?.value,
        checkIn,
        checkOut,
        startDate,
        endDate,
        houseRules,
        perks,
        amenities,
        safetyGuide,
        price: parseInt(price, 10),
        discountPrice: parseInt(price, 10),
        userId: currentUser.id,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.error();
  }
}
