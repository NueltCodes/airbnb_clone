"use client";
import Image from "next/image";
import React from "react";
import { RxPerson } from "react-icons/rx";

interface AvatarProps {
  src?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <div>
      {src ? (
        <Image
          src={src}
          alt="Profile Image"
          className="rounded-full"
          height="30"
          width="30"
        />
      ) : (
        <RxPerson />
      )}
    </div>
  );
};

export default Avatar;
