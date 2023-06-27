"use client";

import React, { useEffect, useMemo, useState } from "react";
import { SafeListing, SafeReviews, SafeUser } from "../../types";
import Image from "next/image";
import styles from "@/styles/styles";
import { signOut } from "next-auth/react";
import useUserUpdateModal from "../../hooks/useUserUpdateModal";
import CountryData from "../../CountryData.json";
import { AiFillStar } from "react-icons/ai";

interface ProfileInfoProps {
  currentUser?: SafeUser | null;
  reviews?: SafeReviews[];
  user: SafeUser | null;
  listingsLength: number;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  currentUser,
  reviews,
  user,
  listingsLength,
}) => {
  const [averageRating, setAverageRating] = useState<number | undefined>(0);
  const updateProfile = useUserUpdateModal();

  useEffect(() => {
    if (reviews) {
      // Calculate the average rating once the reviews data is available
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const averageRatings = totalRating / reviews.length;
      setAverageRating(averageRatings);
    }
  }, [reviews]);

  const country = useMemo(() => {
    const selectedCountry = CountryData.find(
      (country) => country.country_id === user?.country
    );
    return selectedCountry ? selectedCountry.country_name : "";
  }, [user?.country]);

  const state = useMemo(() => {
    const selectedCountry = CountryData.find(
      (country) => country.country_id === user?.country
    );
    if (selectedCountry) {
      const selectedState = selectedCountry.states.find(
        (state) => state.state_id === user?.state
      );
      return selectedState ? selectedState.state_name : "";
    }
    return "";
  }, [user?.country, user?.state]);

  return (
    <div>
      <div>
        <div className="w-full py-5">
          <div className="w-full flex item-center justify-center">
            <Image
              src={user?.image}
              alt=""
              className="object-cover rounded-full"
              width="150"
              height="150"
            />
          </div>
          <h3 className="text-center py-2 text-[20px]">{user?.name}</h3>
          <p className="text-[16px] text-[#000000a6] p-[10px]  text-center">
            {user?.email}
          </p>
        </div>
        <div className="p-3">
          <h5 className="font-semibold">Country</h5>
          <h4 className="text-[#000000a6]">{country}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-semibold">State</h5>
          <h4 className="text-[#000000a6]">{state}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-semibold">Profession</h5>
          <h4 className="text-[#000000a6]">{user?.job}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-semibold">Language</h5>
          <h4 className="text-[#000000a6]">{user?.language}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-semibold">Fun fact</h5>
          <h4 className="text-[#000000a6]">{user?.funFact}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-semibold">Host Number</h5>
          <h4 className="text-[#000000a6]">{user?.number}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-semibold">Total Listing</h5>
          <h4 className="text-[#000000a6]">
            {listingsLength && listingsLength}
          </h4>
        </div>
        <div className="p-3">
          <h5 className="font-semibold">Home Ratings</h5>
          <h4 className="text-[#000000b0] flex items-center">
            <AiFillStar size={20} color="" className="mr-1 cursor-pointer" />
            <span className="">{averageRating}/5</span>
          </h4>
        </div>
        <div className="p-3">
          <h5 className="font-semibold">Joined On</h5>
          <h4 className="text-[#000000b0]">{user?.createdAt?.slice(0, 10)}</h4>
        </div>
        {currentUser?.id && currentUser.id === user?.id && (
          <div className="py-3 px-4">
            <div
              className={`${styles.button} !bg-[#0B3A2C] !border-[#0B3A2C] !w-full !h-[42px] !rounded-[5px]`}
              onClick={updateProfile.onOpen}
            >
              <span className="text-white">Edit Profile</span>
            </div>
            <div
              className={` ${styles.button} !bg-[#0B3A2C] !border-[#0B3A2C] !w-full !h-[42px] !rounded-[5px]`}
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
