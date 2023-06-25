"use client";

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";
import usePaymentModalModal from "@/app/hooks/usePaymentModal";
import styles from "@/styles/styles";
import { useCallback, useState } from "react";
import { SafeListing, SafeUser } from "@/app/types";
import useLoginModal from "@/app/hooks/useLoginModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ListingReservationProps {
  listing: SafeListing & { user: SafeUser };
  price: number;
  currentUser?: SafeUser | null;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  listing,
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  currentUser,
  disabledDates,
}) => {
  const paymentModal = usePaymentModalModal();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const reviewHandler = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);
    axios
      .post("/api/reviews", {
        rating,
        comment,
        listingId: listing?.id,
        userId: currentUser.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        router.refresh();
        setRating(1);
        setComment("");
        setOpen(false);
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
    console.log("nvsfrhsufvjbj");
  }, [comment, currentUser, listing?.id, loginModal, rating, router]);

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden w-full">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">${price}</div>
        <div className="font-light text-neutral-600">per night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button
          disabled={disabled}
          label="Reserve"
          onClick={() => setOpen(true)}
        />
        {/* <Button disabled={disabled} label="Reserve" onClick={onSubmit} /> */}
      </div>
      <hr />
      <div
        className="
          p-4 
          flex 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
