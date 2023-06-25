"use client";

import React, { useState } from "react";
import { SafeListing, SafeReviews, SafeUser, safeEvents } from "../../types";
import styles from "@/styles/styles";
import useUserUpdateModal from "../../hooks/useUserUpdateModal";
import ListingCard from "../../components/listings/ListingCard";
import Image from "next/image";
import Ratings from "../../components/inputs/Ratings";
import useRentModal from "@/app/hooks/useRentModal";
import Button from "@/app/components/Button";

interface ProfileDataProps {
  currentUser?: SafeUser | null;
  reviews?: SafeReviews[];
  events?: safeEvents[];
  listings: SafeListing[];
}

const UserProfileData: React.FC<ProfileDataProps> = ({
  currentUser,
  reviews,
  listings,
  events,
}) => {
  const [active, setActive] = useState(1);
  const updateProfile = useUserUpdateModal();
  const rentModal = useRentModal();
  if (active === 3 && Array.isArray(reviews)) {
    console.log(reviews); // Log the value of reviews
  }
  const handleUpdateProfileClick = () => {
    updateProfile.onOpen();
  };

  if (!reviews) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-semibold text-[14px] sm:text-[20px] ${
                active === 1 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Listings
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-semibold flex items-center text-[14px] sm:text-[20px] ${
                active === 2 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              <span className="hidden 800px:block mr-1">Active </span> Events
            </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-semibold text-[14px] sm:text-[20px] ${
                active === 3 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Reviews
            </h5>
          </div>
          {/* <div>
            {currentUser && (
              <div onClick={() => handleUpdateProfileClick}>
                <div className={`${styles.button} !rounded-[4px] !h-[42px]`}>
                  <span className="text-[#fff]">Update profile</span>
                </div>
              </div>
            )}
          </div> */}
        </div>
      </div>

      <br />
      {active === 1 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {listings &&
            listings.map((listing, index) => (
              <ListingCard data={listing} key={index} />
            ))}

          {listings &&
            listings.length === 0 &&
            listings.map((listing) => (
              <div key={listing.id}>
                {listing.userId === currentUser?.id ? (
                  <div>
                    <h5 className="w-full text-center py-5 text-[18px]">
                      No home kept for reservation yet!
                    </h5>

                    <div className="w-48 mt-4">
                      <Button
                        outline
                        label="Reserve"
                        onClick={rentModal.onOpen}
                      />
                    </div>
                  </div>
                ) : (
                  <h5 className="w-full text-center py-5 text-[18px]">
                    No home kept for reservation yet by this host!
                  </h5>
                )}
              </div>
            ))}
        </div>
      )}

      {active === 2 && (
        <div className="w-full">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {events &&
              events.map((item, index) => (
                <ListingCard
                  data={item}
                  key={index}
                  // isShop={true}
                  // isEvent={true}
                />
              ))}
          </div>
          {events && events.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Events created for this by this Host yet!
            </h5>
          )}
        </div>
      )}

      {active === 3 && Array.isArray(reviews) && (
        <div className="w-full">
          {reviews.map((item, index) => (
            <div className="w-full flex my-4" key={index}>
              <Image
                src={item.user.image}
                alt="User Image"
                width="50"
                height="50"
                className="rounded-full"
              />
              <div className="pl-2">
                <div className="flex w-full items-center">
                  <h1 className="font-semibold pr-2">{item.user.name}</h1>
                  <Ratings rating={item.rating} />
                </div>
                <p className="font-normal text-[#000000a7]">{item?.comment}</p>
                <p className="text-[#000000a7] text-[14px]">
                  {item.user.createdAt?.slice(0, 10)}
                </p>
              </div>
            </div>
          ))}
          {reviews && reviews.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Reviews yet!
            </h5>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfileData;
