"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { createElement, useCallback, useMemo } from "react";
import { format } from "date-fns";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";
import { categories } from "../navbar/Categories";
import { TbBadgeFilled } from "react-icons/tb";
import styles from "@/styles/styles";
import Ratings from "../inputs/Ratings";
import { AiFillStar, AiOutlineEye, AiOutlineStar } from "react-icons/ai";

interface ListingCardProps {
  data: SafeListing & { user?: SafeUser };
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const category = useMemo(() => {
    return categories.find((item) => item.label === data.category);
  }, [data.category]);

  const Icon = category?.icon ? createElement(category.icon) : null;

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <>
      <div
        onClick={() => router.push(`/listings/${data.id}`)}
        className="col-span-1 cursor-pointer group"
      >
        <div className="flex flex-col gap-2 w-full">
          <div
            className="
            aspect-square 
            w-full sm:h-full 
            h-[40vh]
            relative 
            overflow-hidden 
            rounded-xl
          "
          >
            <Image
              fill
              className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
              src={data.imageSrc}
              alt="Listing"
            />
            <div
              className="
            absolute
            top-3
            right-3
          "
            >
              <HeartButton listingId={data.id} currentUser={currentUser} />
            </div>
          </div>
          <div className="font-semibold text-lg">
            {location?.region}, {location?.label}
          </div>
          <div className="flex">
            <Ratings rating={data?.ratings} />
          </div>
          <div
            className={`font-semibold pl-2 text-sm text-black flex gap-1 items-center p-1 rounded-br-lg w-[118px] bg-white shadow-md ${styles.secondary_color}`}
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/userProfile/${data?.userId}`);
            }}
          >
            Host{" "}
            <div>
              <AiOutlineEye
                size={18}
                className="cursor-pointer"
                color="#333"
                title="Profile"
              />
            </div>
            <div>
              {data.ratings && (
                <AiOutlineStar
                  size={18}
                  color="#f6ba00"
                  className="cursor-pointer"
                />
              )}
            </div>
            <span className="text-xs">{data.ratings}</span>
          </div>
          <div className="font-light text-neutral-500 flex items-center gap-1">
            {!reservationDate && <span className="w-auto">{Icon}</span>}
            {reservationDate || data.category}
          </div>
          <div className="flex items-center gap-1">
            <div className="font-semibold">${price}</div>
            {!reservation && <div className="font-light">night</div>}
          </div>
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ListingCard;
