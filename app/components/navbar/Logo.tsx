"use client";

import { SafeListing, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { GiPeaceDove } from "react-icons/gi";

interface ILogoProps {
  favorites?: SafeListing[] | null;
  currentUser?: SafeUser[] | null;
}

const Logo: React.FC<ILogoProps> = ({ favorites, currentUser }) => {
  const router = useRouter();

  return (
    <>
      <div
        className="hidden 800px:block cursor-pointer gap-1"
        onClick={() => router.push("/")}
      >
        <div className="flex items-center">
          <GiPeaceDove className="text-gray-300" size={40} />

          <div className="text-blue-600 font-bold hidden 800px:text-[25px]">
            Reserv
            <span className="text-red-500 hidden 800px:text-[25px]">ə</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logo;
