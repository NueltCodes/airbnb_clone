"use client";

import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useRouter } from "next/navigation";
import MenuItem from "./MenuItem";

const UserMenu = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block font-semibold text-sm py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={() => toggleOpen()}
          className="flex items-center gap-3 rounded-full cursor-pointer p-4 md:py-1 md:px-2 border-neutral-200 border-[1px] transition hover:shadow-sm"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {open && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {/* {currentUser ? ( */}
            <>
              <MenuItem
                label="My trips"
                onClick={() => router.push("/trips")}
              />
              <MenuItem
                label="My favorites"
                onClick={() => router.push("/favorites")}
              />
              <MenuItem
                label="My reservations"
                onClick={() => router.push("/reservations")}
              />
              <MenuItem
                label="My properties"
                onClick={() => router.push("/properties")}
              />
            </>
            {/* )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
