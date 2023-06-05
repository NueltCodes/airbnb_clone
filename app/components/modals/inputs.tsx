"use client";

import { CgGym, CgScreen } from "react-icons/cg";
import {
  GiPartyFlags,
  GiWaterfall,
  GiBathtub,
  GiOfficeChair,
  GiFireExtinguisher,
  GiFireplace,
  GiWashingMachine,
} from "react-icons/gi";
import { FaParking } from "react-icons/fa";
import { RiAlarmWarningFill } from "react-icons/ri";
import { BiWifi } from "react-icons/bi";
import { TbDog } from "react-icons/tb";
import { BsSignNoParkingFill } from "react-icons/bs";
import { BiFirstAid } from "react-icons/bi";
import { WiSmoke } from "react-icons/wi";
import { TbIroningSteam, TbToolsKitchen2 } from "react-icons/tb";
import {
  MdOutlinePool,
  MdOutlineAir,
  MdOutlineTableRestaurant,
  MdOutdoorGrill,
  MdOutlineBalcony,
  MdOutlineFireplace,
} from "react-icons/md";

export const perks = [
  {
    label: "Pool",
    icon: MdOutlinePool,
    description: "This property has a Pool!",
  },
  {
    label: "Hot tub",
    icon: GiBathtub,
    description: "This property has an hot tub!",
  },
  {
    label: "Patio",
    icon: MdOutlineBalcony,
    description: "This property is has a balcony/courtyard!",
  },
  {
    label: "BBQ grill",
    icon: MdOutdoorGrill,
    description: "This property own a BBQ grill spot!",
  },
  {
    label: "Fire pit",
    icon: GiFireplace,
    description: "This is property has a fire place!",
  },
  {
    label: "Pool table",
    icon: MdOutlineTableRestaurant,
    description: "This property has a pool table!",
  },
  {
    label: "Indoor fireplace",
    icon: MdOutlineFireplace,
    description: "indoor fire place!",
  },
  {
    label: "Outdoor dining area",
    icon: GiPartyFlags,
    description: "This property own a outdoor dining area!",
  },
  {
    label: "Exercise equipment",
    icon: CgGym,
    description: "This property has a mini gym!",
  },
  {
    label: "Free Parking",
    icon: FaParking,
    description: "This property has free parking space!",
  },
  {
    label: "Outdoor shower",
    icon: GiWaterfall,
    description: "This property offers a nice outdoor shower!",
  },
];

export const amenities = [
  {
    label: "Wifi",
    icon: BiWifi,
    description: "Free Wifi!",
  },
  {
    label: "Tv",
    icon: CgScreen,
    description: "Flat screen!",
  },
  {
    label: "Kitchen",
    icon: TbToolsKitchen2,
    description: "Kitchen availabel!",
  },
  {
    label: "Washer",
    icon: GiWashingMachine,
    description: "Washing maching!",
  },
  {
    label: "Free parking",
    icon: FaParking,
    description: "Free parking!",
  },
  {
    label: "Paid parking",
    icon: BsSignNoParkingFill,
    description: "Paid parking on permises!",
  },
  {
    label: "Air condition",
    icon: MdOutlineAir,
    description: "Cool working air condition!",
  },
  {
    label: "Worksapce",
    icon: GiOfficeChair,
    description: "Available workspace area!",
  },
  {
    label: "Iron",
    icon: TbIroningSteam,
    description: "Available cloth iron!",
  },
];

export const safetyGuide = [
  {
    label: "Smoke alarm",
    icon: WiSmoke,
  },
  {
    label: "Fire extinguisher",
    icon: GiFireExtinguisher,
  },
  {
    label: "Carbon monoxide alaram",
    icon: RiAlarmWarningFill,
  },
  {
    label: "Security dogs",
    icon: TbDog,
  },
  {
    label: "First aid",
    icon: BiFirstAid,
  },
];
