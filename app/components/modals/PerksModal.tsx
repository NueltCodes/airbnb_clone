"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import usePerksModal from "@/app/hooks/usePerksModal";

import Modal from "./Modal";
import { IconType } from "react-icons";

interface PerksModalProps {
  matchedPerks: { label: string; icon: IconType; description: string }[];
  matchedAmenities: { label: string; icon: IconType; description: string }[];
  matchedSafeties: { label: string; icon: IconType }[];
}

const PerksModal: React.FC<PerksModalProps> = ({
  matchedPerks,
  matchedAmenities,
  matchedSafeties,
}) => {
  const router = useRouter();
  const perksModal = usePerksModal();

  let bodyContent = (
    <div>
      <div>
        {matchedPerks.length > 0 && (
          <div className="py-4 text-[18px] text-[#222222]">Perks Available</div>
        )}
        {matchedPerks &&
          matchedPerks.map((perk) => (
            <div
              key={perk.label}
              className="flex items-center gap-2 border-b border-neutral-200 py-6"
            >
              <span>
                <perk.icon size={30} className="text-[#565656]" />
              </span>
              <span>{perk.label}</span>
            </div>
          ))}
      </div>

      <div>
        {matchedAmenities.length > 0 && (
          <div className="py-4 text-[18px] text-[#222222]">
            Amenities Available
          </div>
        )}{" "}
        <div>
          {matchedAmenities &&
            matchedAmenities.map((perk) => (
              <div
                key={perk.label}
                className="flex items-center gap-2 border-b border-neutral-200 py-6"
              >
                <span>
                  <perk.icon size={30} className="text-[#565656]" />
                </span>
                <span>{perk.label}</span>
              </div>
            ))}
        </div>
      </div>

      <div>
        {matchedSafeties.length > 0 && (
          <div className="py-4 text-[18px] text-[#222222]">Safety Guide</div>
        )}{" "}
        <div>
          {matchedSafeties &&
            matchedSafeties.map((perk) => (
              <div
                key={perk.label}
                className="flex items-center gap-2 border-b border-neutral-200 py-6"
              >
                <span>
                  <perk.icon size={30} className="text-[#565656]" />
                </span>
                <span>{perk.label}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      open={perksModal.open}
      dontShowButton
      title="What this place offers!"
      onClose={perksModal.onClose}
      body={bodyContent}
    />
  );
};

export default PerksModal;
