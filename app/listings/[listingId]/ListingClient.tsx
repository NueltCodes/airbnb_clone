"use client";

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import {
  SafeReservation,
  SafeUser,
  SafeListing,
  SafeReviews,
} from "@/app/types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import PaymentModal from "@/app/components/modals/PaymentModal";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Comments from "@/app/components/Comments";
import {
  amenities,
  houseRules,
  perks,
  safetyGuide,
} from "@/app/components/modals/inputs";
import PerksModal from "@/app/components/modals/PerksModal";
import UserUpdateModal from "@/app/components/modals/UserUpdateModal";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};
interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & { user: SafeUser };
  currentUser?: SafeUser | null;
  review?: SafeReviews[];
}

const ListingClient: React.FC<ListingClientProps> = ({
  reservations = [],
  listing,
  currentUser,
  review,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  const matchedPerks = useMemo(() => {
    if (!listing.perks) return []; // Handle the case when listing.perks is undefined or null

    return perks.filter((perk) => listing.perks.includes(perk.label));
  }, [listing.perks]);

  const matchedAmenities = useMemo(() => {
    if (!listing.amenities) return [];

    return amenities.filter((amenity) =>
      listing.amenities.includes(amenity.label)
    );
  }, [listing.amenities]);

  const matchedHouseRules = useMemo(() => {
    if (!listing.houseRules) return [];

    return houseRules.filter((rules) =>
      listing.houseRules.includes(rules.label)
    );
  }, [listing.houseRules]);

  const matchedSafeties = useMemo(() => {
    if (!listing.safetyGuide) return [];

    return safetyGuide.filter((amenity) =>
      listing.safetyGuide.includes(amenity.label)
    );
  }, [listing.safetyGuide]);

  console.log(matchedPerks);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        router.refresh();
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <div>
      <Container>
        <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-col gap-6">
            <ListingHead
              title={listing.title}
              imageSrc={listing.imageSrc}
              locationValue={listing.locationValue}
              id={listing.id}
              currentUser={currentUser}
            />
            <div className="flex-col flex md:flex-row gap-6 md:gap-10 mt-6">
              <ListingInfo
                user={listing.user}
                category={category}
                description={listing.description}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.locationValue}
                matchedAmenities={matchedAmenities}
                matchedPerks={matchedPerks}
                matchedSafeties={matchedSafeties}
                matchedHouseRules={matchedHouseRules}
                checkIn={listing.checkIn}
                checkOut={listing.checkOut}
              />
              <div className="order-last mb-10 md:order-last md:col-span-3">
                <div className="sticky-container">
                  <ListingReservation
                    listing={listing}
                    currentUser={currentUser}
                    review={review}
                    price={listing.price}
                    totalPrice={totalPrice}
                    onChangeDate={(value) => setDateRange(value)}
                    dateRange={dateRange}
                    onSubmit={onCreateReservation}
                    disabled={isLoading}
                    disabledDates={disabledDates}
                  />
                </div>
              </div>

              {/* <Elements stripe={stripePromise}>
                <div>
                  <CardNumberElement />
                  <CardExpiryElement />
                  <CardCvcElement />
                  <PaymentModal
                    startDate={dateRange.startDate ?? new Date()}
                    endDate={dateRange.endDate ?? new Date()}
                    listingId={listing?.id}
                    setDateRange={setDateRange}
                    totalPrice={totalPrice}
                    // onSubmit={onCreateReservation}
                    disabled={isLoading}
                    currentUser={currentUser}
                  />
                </div>
              </Elements> */}
            </div>

            <Comments
              listing={listing}
              totalPrice={totalPrice}
              currentUser={currentUser}
              review={review}
            />
            <PerksModal
              matchedAmenities={matchedAmenities}
              matchedPerks={matchedPerks}
              matchedSafeties={matchedSafeties}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ListingClient;
