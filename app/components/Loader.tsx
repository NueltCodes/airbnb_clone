"use client";
import animationData from "../../Assests/animations/17450-health-tourism-and-hotel-reservation-animation.json";
import { useLottie } from "lottie-react";

const Loader = () => {
  const options = {
    animationData: animationData,
    loop: true,
    // autoplay: true,
  };

  const { View } = useLottie(options);

  return (
    <div
      className=" h-[70vh]
    flex 
    flex-col 
    justify-center 
    items-center"
    >
      {View}
    </div>
  );
};

export default Loader;
