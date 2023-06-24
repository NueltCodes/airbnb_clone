"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { differenceInDays } from "date-fns";
import useSearchModal from "@/app/hooks/useSearchModal";
import useCountries from "@/app/hooks/useCountries";
import { AiOutlineHeart, AiOutlineMenu } from "react-icons/ai";
import { SafeListing, SafeUser } from "@/app/types";
import useLoginModal from "@/app/hooks/useLoginModal";

interface ISearchProps {
  favorites?: SafeListing[] | null;
  currentUser?: SafeUser[] | null;
}

const Search: React.FC<ISearchProps> = ({ favorites, currentUser }) => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const loginModal = useLoginModal();

  const handleMenuItemClick = (route: string) => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    router.push(route);
    setOpen((value) => !value);
  };

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return "Anywhere";
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any Week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, [guestCount]);

  return (
    <>
      <div
        onClick={searchModal.onOpen}
        className="block  border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer
      "
      >
        <div
          className="flex 
          items-center justify-between"
        >
          <div className="text-sm font-semibold px-6">{locationLabel}</div>
          <div className="hidden 800px:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
            {durationLabel}
          </div>
          <div className="text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3">
            <div className="hidden 800px:block">{guestLabel}</div>
            <div className="p-2 bg-[#0B3A2C] rounded-full text-white">
              <BiSearch size={18} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
