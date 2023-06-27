"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import Container from "../Container";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import Categories from "./Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";

interface NavbarProps {
  currentUser?: SafeUser | null;
  favorites?: SafeListing[] | null;
  reservations?: SafeReservation[];
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  favorites,
  reservations,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed w-full bg-white z-40 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <>
            <div className="800px:flex items-center justify-between gap-3 800px:gap-0">
              <Logo favorites={favorites} currentUser={currentUser} />
              <div className="hidden 800px:block">
                <Search favorites={favorites} currentUser={currentUser} />
              </div>

              <UserMenu
                currentUser={currentUser}
                reservations={reservations}
                favorites={favorites}
                mobileOpen={open === true}
                setMobileOpen={setOpen}
              />
            </div>
          </>
        </Container>
        <Categories />
      </div>
    </div>
  );
};

export default Navbar;
