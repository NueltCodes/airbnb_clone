"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  IoBedOutline,
  IoLanguageOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { BiUserCircle } from "react-icons/bi";
import { GiModernCity } from "react-icons/gi";
import { FaRegLightbulb, FaShower } from "react-icons/fa";
import {
  MdOutlineCelebration,
  MdOutlineLocalOffer,
  MdOutlineMeetingRoom,
  MdOutlineWorkOutline,
} from "react-icons/md";
import { BsTelephonePlus } from "react-icons/bs";
import usePerksModal from "@/app/hooks/usePerksModal";
import { useMemo } from "react";
import CountryData from "../../CountryData.json";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  locationValue: string;
  checkIn: string;
  checkOut: string;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  matchedPerks: { label: string; icon: IconType; description: string }[];
  matchedAmenities: { label: string; icon: IconType }[];
  matchedSafeties: { label: string; icon: IconType }[];
  matchedHouseRules: { label: string; icon: IconType }[];
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  matchedPerks,
  matchedAmenities,
  matchedSafeties,
  matchedHouseRules,
  category,
  locationValue,
  checkIn,
  checkOut,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  const perksModal = usePerksModal();

  const country = useMemo(() => {
    const selectedCountry = CountryData.find(
      (country) => country.country_id === user.country
    );
    return selectedCountry ? selectedCountry.country_name : "";
  }, [user.country]);

  const state = useMemo(() => {
    const selectedCountry = CountryData.find(
      (country) => country.country_id === user.country
    );
    if (selectedCountry) {
      const selectedState = selectedCountry.states.find(
        (state) => state.state_id === user.state
      );
      return selectedState ? selectedState.state_name : "";
    }
    return "";
  }, [user.country, user.state]);

  const totalPerksCounts = useMemo(() => {
    let count = 0;

    if (matchedAmenities) {
      count += matchedAmenities.length;
    }

    if (matchedPerks) {
      count += matchedPerks.length;
    }

    if (matchedSafeties) {
      count += matchedSafeties.length;
    }

    return count;
  }, [matchedAmenities, matchedPerks, matchedSafeties]);

  const coordinates = getByValue(locationValue)?.latlng;
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex mt-3 mb-2 items-center gap-4 font-light text-neutral-500">
          <div className="flex flex-col justify-between items-center p-3 rounded-lg border w-[115px] h-[80px] sm:w-[135px]">
            <IoBedOutline size={22} />
            <span className="sm:text-sm text-[10px] mt-1">
              {" "}
              {guestCount} guests
            </span>
          </div>
          <div className="flex flex-col justify-between items-center p-3 rounded-lg border w-[115px] h-[80px] sm:w-[135px]">
            <MdOutlineMeetingRoom size={22} />
            <span className="sm:text-sm text-[10px] mt-1">
              {" "}
              {roomCount} rooms
            </span>
          </div>
          <div className="flex flex-col justify-between items-center p-3 rounded-lg border w-[115px] h-[80px] sm:w-[135px]">
            <FaShower size={22} />
            <span className="sm:text-sm text-[10px] mt-1">
              {" "}
              {bathroomCount} bathrooms
            </span>
          </div>
        </div>

        <h1 className="text-xl">Get to know your host</h1>
        <div className="text-[16px] font-semibold w-[90%] bg-[#F0EFE9] p-5 flex flex-col items-center gap-2 rounded-lg">
          <div className="">
            <Image
              src={user?.image}
              alt="Profile Photo"
              className="rounded-full"
              height="80"
              width="80"
            />{" "}
            <div className="py-2 gap-1.5 flex items-center">
              <BiUserCircle size={22} className="text-neutral-500" />
              <h1>
                Host: <span>{user.name}</span>
              </h1>
            </div>
            <div className="py-2 gap-1.5 flex items-center">
              <BsTelephonePlus size={22} className="text-neutral-500" />
              <h1>
                Host Line: <span>{user.number}</span>
              </h1>
            </div>
            <div className="py-2 gap-1.5 flex items-center">
              <IoLanguageOutline size={22} className="text-neutral-500" />
              <h1>
                Languege: <span>{user.language}</span>
              </h1>
            </div>
            <div className="py-2 gap-1.5 flex items-center">
              <IoLocationOutline size={22} className="text-neutral-500" />{" "}
              <h1>
                Country: <span>{country}</span>
              </h1>
            </div>
            <div className="py-2 gap-1.5 flex items-center">
              <GiModernCity size={22} className="text-neutral-500" />{" "}
              <h1>
                State: <span>{state}</span>
              </h1>
            </div>
            <div className="py-2 gap-1.5 flex items-center">
              <FaRegLightbulb size={22} className="text-neutral-500" />
              <h1>
                Fun fact: <span>{user.funFact}</span>
              </h1>
            </div>
            <div className="py-2 gap-1.5 flex items-center">
              <MdOutlineWorkOutline size={22} className="text-neutral-500" />
              <h1>
                Profession: <span>{user.job}</span>
              </h1>
            </div>
            <div className="py-2 gap-1.5 flex items-center">
              <MdOutlineCelebration size={22} className="text-neutral-500" />
              <h1>
                Joined On: <span>{user.createdAt?.slice(0, 10)}</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <p
        className="leading-8 text-lg font-light text-neutral-500 whitespace-pre-line"
        dangerouslySetInnerHTML={{
          __html: description.replace(/\n/g, "<br />"),
        }}
      ></p>
      <hr />
      <div>
        {matchedPerks.length > 0 && (
          <div className="py-6 text-xl flex items-center justify-center gap-2 font-semibold text-[#222222]">
            What this place offers <MdOutlineLocalOffer size={40} />
          </div>
        )}
        <div className="grid grid-cols-2 items-center gap-2">
          {matchedAmenities &&
            matchedAmenities.map((perk) => (
              <div
                key={perk.label}
                className="flex items-center gap-2 border-b border-neutral-200 py-6"
              >
                <span>
                  <perk.icon size={30} className="text-[#565656]" />
                </span>
                <span>{perk.label}</span>
              </div>
            ))}
        </div>
      </div>
      <div
        className={` text-white w-auto bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer`}
        onClick={perksModal.onOpen}
      >
        Show all {totalPerksCounts} amenities
      </div>
      <div className="z-0">
        <Map center={coordinates} />
      </div>
      {matchedHouseRules &&
        matchedHouseRules.map((rules) => (
          <div
            key={rules.label}
            className="flex items-center gap-2 border-b border-neutral-200 py-6"
          >
            <span>
              <rules.icon size={30} className="text-[#565656]" />
            </span>
            <span>{rules.label}</span>
          </div>
        ))}
    </div>
  );
};

export default ListingInfo;
