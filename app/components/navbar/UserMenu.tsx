"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useRouter, useSearchParams } from "next/navigation";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { signOut } from "next-auth/react";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import useProfileUpdateModal from "@/app/hooks/useUserUpdateModal";
import useEventsModal from "@/app/hooks/useEvents";
import Search from "./Search";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import { GiPeaceDove } from "react-icons/gi";
import { BiMenuAltLeft } from "react-icons/bi";
interface UserMenuProps {
  currentUser?: SafeUser | null;
  favorites?: SafeListing[] | null;
  reservations?: SafeReservation[];
  mobileOpen?: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser,
  favorites,
  reservations,
  mobileOpen,
  setMobileOpen,
}) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const updateProfile = useProfileUpdateModal();
  const createEvent = useEventsModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [open, setOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("");
  const [mobileRoute, setMobileRoute] = useState("");
  const [isCreateEventOpen, setCreateEventOpen] = useState(false);
  const [isRentOpen, setIsRentOpen] = useState(false);
  const [isProfile, setIsProfileOpen] = useState(false);
  const params = useSearchParams(); // Retrieve the query parameters

  // useEffect(() => {
  //   const locationValue = params?.get("locationValue");
  //   setActiveRoute(locationValue || ""); // Set the active route based on the "locationValue" parameter

  //   // Optionally, you can also update the mobileOpen state if needed
  //   // setMobileOpen(false);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [params]); // Run this effect only once on component mount

  const handleMenuItemClick = (route: string) => {
    router.push(route);
    setActiveRoute(route);
    setOpen((value) => !value);
    setMobileOpen((value) => !value);
  };
  const handleFavourite = (route: string) => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    router.push(route);
    setOpen((value) => !value);
    setMobileOpen((value) => !value);
  };

  const isActiveRoute = (route: string) => {
    return activeRoute === route;
  };

  const handleCreateEventClick = (route: string) => {
    createEvent.onOpen();
    setActiveRoute(route);
    setOpen(false);
    setMobileOpen((value) => !value);
  };

  const handleUpdateProfileClick = (route: string) => {
    setActiveRoute(route);
    updateProfile.onOpen();
    setOpen(false);
    setMobileOpen((value) => !value);
  };

  const handleLoginClick = () => {
    loginModal.onOpen();
    setOpen(false);
    setMobileOpen((value) => !value);
  };

  const onRent = useCallback(
    (route: string) => {
      setOpen((value) => !value);
      setActiveRoute(route);
      setMobileOpen((value) => !value);

      if (!currentUser) {
        return loginModal.onOpen();
      }

      rentModal.onOpen();
    },
    [currentUser, loginModal, rentModal, setMobileOpen]
  );

  const onRent1 = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  const handleMobileMenuToggle = () => {
    setMobileOpen((prevOpen) => {
      console.log("open:", !prevOpen); // Log the state on the first click
      return !prevOpen; // Toggle the open state
    });
  };

  return (
    <>
      <div className="relative hidden 800px:block">
        <div className="flex items-center gap-3">
          <div
            onClick={onRent1}
            className="hidden 800px:block font-semibold text-sm py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          >
            Reserve your home
          </div>
          <div
            onClick={() => setOpen((value) => !value)}
            className="flex items-center gap-3 rounded-full cursor-pointer p-4 800px:py-1 800px:px-2 border-neutral-200 border-[1px] transition hover:shadow-sm"
          >
            <AiOutlineMenu />
            <div className="hidden 800px:block">
              <Avatar src={currentUser?.image} />
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
            800px:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
          >
            <div className="flex flex-col cursor-pointer">
              {currentUser ? (
                <>
                  <MenuItem
                    label="My trips"
                    active={isActiveRoute("/trips")}
                    onClick={() => handleMenuItemClick("/trips")}
                  />
                  <MenuItem
                    label="My favorites"
                    active={isActiveRoute("/favorites")}
                    onClick={() => handleMenuItemClick("/favorites")}
                  />
                  <MenuItem
                    label="Bookings"
                    reservations={reservations}
                    active={isActiveRoute("/reservations")}
                    onClick={() => handleMenuItemClick("/reservations")}
                  />
                  <MenuItem
                    label="My properties"
                    active={isActiveRoute("/properties")}
                    onClick={() => handleMenuItemClick("/properties")}
                  />
                  <MenuItem
                    label="Create Events"
                    active={isCreateEventOpen}
                    onClick={() => handleCreateEventClick("Create Events")}
                  />
                  <MenuItem
                    label="Host my home"
                    active={isActiveRoute("rent")}
                    onClick={() => onRent("rent")}
                  />
                  <hr />
                  <MenuItem
                    label="Update profile"
                    active={isActiveRoute("updateProfile")}
                    onClick={() => handleUpdateProfileClick("updateProfile")}
                  />
                  <MenuItem
                    label="Profile"
                    active={isActiveRoute("rent")}
                    onClick={() => onRent("rent")}
                  />
                  <hr />
                  <MenuItem label="Logout" onClick={() => signOut()} />
                </>
              ) : (
                <>
                  <MenuItem label="Login" onClick={handleLoginClick} />
                  <MenuItem label="Sign up" onClick={registerModal.onOpen} />
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* mobile view */}
      <div className="bg-[#fff] z-50 shadow-sm 800px:hidden">
        <div className="w-full flex items-center justify-between">
          <div
            onClick={handleMobileMenuToggle}
            className="cursor-pointer transition hover:opacity-70"
          >
            <BiMenuAltLeft size={30} />
          </div>

          <div onClick={() => router.push("/")}>
            <div className="flex items-center">
              <GiPeaceDove className="text-gray-300 text-2xl sm:text-4xl" />

              <div className="text-3xl sm:text-4xl font-bold mt-3 cursor-pointer text-[#591991] ">
                Reserv
                <span className=" text-[#0B3A2C]">ə</span>
              </div>
            </div>
          </div>
          <div>
            <div
              className="relative mr-[20px] cursor-pointer"
              onClick={() => handleMenuItemClick("/favorites")}
            >
              <AiOutlineHeart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {favorites && favorites.length}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile view */}
      {mobileOpen && (
        <div
          className={`fixed w-full bg-[#0000005f] z-20 block 800px:hidden  h-full top-0 left-0 overflow-y-scroll scrollbar-hide`}
        >
          <div className="fixed w-[75%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll scrollbar-hide">
            <div className="w-full justify-between items-center flex pt-4 pr-3">
              <div>
                <div
                  className="relative mr-[15px] cursor-pointer"
                  onClick={() => handleFavourite("/favorites")}
                >
                  <AiOutlineHeart size={30} className="ml-3" />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                    {favorites && favorites.length}
                  </span>
                </div>
              </div>
              <div onClick={() => router.push("/")}>
                <div className="flex items-center">
                  <GiPeaceDove className="text-gray-300 text-2xl sm:text-4xl" />

                  <div className="text-3xl sm:text-4xl font-bold mt-3 cursor-pointer text-[#591991] ">
                    Reserv
                    <span className=" text-[#0B3A2C]">ə</span>
                  </div>
                </div>
              </div>
              <RxCross1
                size={30}
                className="ml-4 transition hover:opacity-75"
                onClick={() => setMobileOpen((value) => !value)}
              />
            </div>

            <div className="my-8 w-[92%] m-auto relative">
              <Search />
            </div>
            {/* <UserMenu active={activeHeading} /> */}
            <div className="800px:hidden flex flex-col cursor-pointer">
              {currentUser ? (
                <>
                  <MenuItem
                    label="My trips"
                    active={isActiveRoute("/trips")}
                    onClick={() => handleMenuItemClick("/trips")}
                  />
                  <MenuItem
                    label="My favorites"
                    active={isActiveRoute("/favorites")}
                    onClick={() => handleMenuItemClick("/favorites")}
                  />

                  <MenuItem
                    label="Bookings"
                    reservations={reservations}
                    active={isActiveRoute("/reservations")}
                    onClick={() => {
                      handleMenuItemClick("/reservations");
                    }}
                  />
                  <MenuItem
                    label="My properties"
                    active={isActiveRoute("/properties")}
                    onClick={() => handleMenuItemClick("/properties")}
                  />
                  <hr />
                  <MenuItem
                    label="Reserve my space"
                    active={isActiveRoute("rent")}
                    onClick={() => onRent("rent")}
                  />
                  <MenuItem
                    label="Create Events"
                    active={isActiveRoute("Create Events")}
                    onClick={() => handleCreateEventClick("Create Events")}
                  />
                  <hr />
                  <MenuItem
                    label="Update profile"
                    active={isActiveRoute("updateProfile")}
                    onClick={() => handleUpdateProfileClick("updateProfile")}
                  />
                  <MenuItem
                    label="Profile"
                    active={isActiveRoute("updateProfile")}
                    onClick={() => onRent("profile")}
                  />
                  <hr />
                  <MenuItem label="Logout" onClick={() => signOut()} />
                </>
              ) : (
                <>
                  <MenuItem label="Login" onClick={handleLoginClick} />
                  <MenuItem label="Sign up" onClick={registerModal.onOpen} />
                </>
              )}
              {/* <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link> */}
            </div>
            <br />
            <br />
            <br />

            <div className="w-full flex justify-center">
              {currentUser ? (
                <div>
                  <div>
                    <Image
                      src={currentUser.image}
                      alt="Profile Image"
                      className="rounded-full border-[3px] border-[#0eae88] mb-7"
                      width="60"
                      height="60"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <MenuItem label="Login" onClick={handleLoginClick} />
                  <MenuItem label="Sign up" onClick={registerModal.onOpen} />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserMenu;
