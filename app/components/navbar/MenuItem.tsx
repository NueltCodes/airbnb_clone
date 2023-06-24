"use client";

import { SafeReservation } from "@/app/types";
import { AiOutlineHeart } from "react-icons/ai";

interface MenuItemProps {
  reservations?: SafeReservation[];
  onClick: () => void;
  label: string | null;
  active?: boolean;
}
const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label,
  active,
  reservations,
}) => {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-4 text-xl hover:bg-[#0b3a2cc2] hover:text-white hover:bg-opacity-50 transition font-semibold ${
        active ? "bg-[#0B3A2C] text-white" : "bg-white"
      }`}
    >
      {reservations ? (
        <div>
          <div className="relative mr-[15px] cursor-pointer">
            <div>{label} </div>
            <span className="absolute left-[82px] top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
              {reservations && reservations.length}
            </span>
          </div>
        </div>
      ) : (
        <>{label}</>
      )}
    </div>
  );
};

export default MenuItem;
