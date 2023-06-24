"use client";

import React, { useState } from "react";
import { SafeListing, SafeReviews, SafeUser } from "../types";
import Image from "next/image";
import styles from "@/styles/styles";
import { signOut } from "next-auth/react";

interface ProfileInfoProps {
  currentUser?: SafeUser | null;
  reviews?: SafeReviews[];
  listing: SafeListing[] & { user: SafeUser };
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  currentUser,
  reviews,
  listing,
}) => {
  const [averageRating, setAverageRating] = useState<number | undefined>(0);

  if (reviews) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRatings = totalRating / reviews.length;
    setAverageRating(averageRatings);
  }

  return (
    <div>
      <div>
        <div className="w-full py-5">
          <div className="w-full flex item-center justify-center">
            <Image
              src={currentUser?.image}
              alt=""
              className="object-cover rounded-full"
              width="150"
              height="150"
            />
          </div>
          <h3 className="text-center py-2 text-[20px]">{currentUser?.name}</h3>
          <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
            {currentUser?.email}
          </p>
        </div>
        <div className="p-3">
          <h5 className="font-semibold">Address</h5>
          <h4 className="text-[#000000a6]">{currentUser?.country}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-semibold">Phone Number</h5>
          <h4 className="text-[#000000a6]">{currentUser?.number}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-semibold">Total Products</h5>
          <h4 className="text-[#000000a6]">{listing && listing.length}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-semibold">Shop Ratings</h5>
          <h4 className="text-[#000000b0]">{averageRating}/5</h4>
        </div>
        <div className="p-3">
          <h5 className="font-semibold">Joined On</h5>
          <h4 className="text-[#000000b0]">
            {currentUser?.createdAt?.slice(0, 10)}
          </h4>
        </div>
        {currentUser && (
          <div className="py-3 px-4">
            {/* <div
          className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
        >
          <Link to="/settings">
            <span className="text-white">Edit Shop</span>
          </Link>
        </div> */}
            <div
              className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
              onClick={() => signOut()}
            >
              <span className="text-white">Log Out</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
