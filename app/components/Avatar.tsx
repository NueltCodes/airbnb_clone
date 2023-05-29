"use client";
import Image from "next/image";
import React from "react";
import { RxPerson } from "react-icons/rx";
const Avatar = () => {
  return (
    <div>
      <RxPerson />
      {/* <Image src='/images/placeholder.jpg' alt="" className="rounded-full" height="30" width='30'/> */}
    </div>
  );
};

export default Avatar;
