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

          <div className="text-3xl sm:text-4xl font-bold mt-3 cursor-pointer text-[#591991] hidden 800px:block">
            Reserv
            <span className=" text-[#0B3A2C]">ə</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logo;
