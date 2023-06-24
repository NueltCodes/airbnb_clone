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
import { AiOutlineHeart, AiOutlineMenu } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import { GiPeaceDove } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import styles from "@/styles/styles";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Image from "next/image";
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
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const handleMenuItemClick = (route: string) => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    router.push(route);
    setOpen((value) => !value);
  };

  const handleLoginClick = () => {
    loginModal.onOpen();
    setOpen(false);
  };

  return (
    <>
      <div className="fixed w-full bg-white z-10 shadow-sm">
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
    </>
  );
};

export default Navbar;
