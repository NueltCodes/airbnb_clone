"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import useRentModal from "@/app/hooks/useRentModal";

import Modal from "./Modal";
import Counter from "../inputs/Counter";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import { categories } from "../navbar/Categories";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import Heading from "../Heading";
import { amenities, perks, safetyGuide } from "./inputs";
import TimeInput from "../inputs/TimeInput";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
  PERKS = 6,
  AMENITIES = 7,
  SAFETY = 8,
  // SPACES = 9,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      checkOut: "",
      checkIn: "",
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
      perks: [],
      amenities: [],
      safetyGuide: [],
      otherSpace: [],
    },
  });

  const location = watch("location");
  const selectedCategory = watch("category");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const checkOut = watch("checkOut");
  const checkIn = watch("checkIn");
  const imageSrc = watch("imageSrc");
  const selectedPerks = watch("perks");
  const selectedAmenities = watch("amenities");
  const selectedSafetyGuide = watch("safetyGuide");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.SAFETY) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.SAFETY) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const handleCategoryClick = (category: string) => {
    setCustomValue("category", category);
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={() => handleCategoryClick(item.label)}
              selected={selectedCategory === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <Counter
          onChange={(value) => setCustomValue("guestCount", value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("roomCount", value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("bathroomCount", value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
        <TimeInput
          onChange={(value) => setCustomValue("checkIn", value)}
          value={checkIn}
          title="Check-in time"
          subtitle="State your check-in"
        />
        <TimeInput
          onChange={(value) => setCustomValue("checkOut", value)}
          value={checkOut}
          title="Check-out time"
          subtitle="State your check-out time"
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          // text
          type="text"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          textarea
          watch={watch}
          setValue={setValue}
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  //  This below take action only when step === STEPS.PERKS

  const handlePerksClick = (perk: string) => {
    const updatedPerks = selectedPerks.includes(perk)
      ? selectedPerks.filter((p: string) => p !== perk)
      : [...selectedPerks, perk];
    setCustomValue("perks", updatedPerks);
  };

  if (step === STEPS.PERKS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Do you have any of these perks?" subtitle="Pick any" />
        <div
          className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
        >
          {perks.map((perk) => (
            <div key={perk.label} className="col-span-1">
              <CategoryInput
                onClick={() => handlePerksClick(perk.label)}
                label={perk.label}
                icon={perk.icon}
                selected={selectedPerks?.includes(perk.label)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  //  This below take action only when step === STEPS.AMENITIES
  const handleAmenitiesClick = (amenity: string) => {
    const updatedAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a: string) => a !== amenity)
      : [...selectedAmenities, amenity];

    setCustomValue("amenities", updatedAmenities);
  };

  if (step === STEPS.AMENITIES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Have any of these amenities?" subtitle="Pick any" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          {amenities.map((amenity) => (
            <div key={amenity.label} className="col-span-1">
              <CategoryInput
                onClick={() => handleAmenitiesClick(amenity.label)}
                selected={selectedAmenities.includes(amenity.label)}
                label={amenity.label}
                icon={amenity.icon}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  //  This below take action only when step === STEPS.SAFETY
  const handleSafetyClick = (safety: string) => {
    const updatedSafety = selectedSafetyGuide.includes(safety)
      ? selectedSafetyGuide.filter((a: string) => a !== safety)
      : [...selectedSafetyGuide, safety];

    setCustomValue("safetyGuide", updatedSafety);
  };

  if (step === STEPS.SAFETY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Do you have any safety means?" subtitle="Pick any" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          {safetyGuide.map((safety) => (
            <div key={safety.label} className="col-span-1">
              <CategoryInput
                onClick={() => handleSafetyClick(safety.label)}
                selected={selectedSafetyGuide.includes(safety.label)}
                label={safety.label}
                icon={safety.icon}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      open={rentModal.open}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
};

export default RentModal;
