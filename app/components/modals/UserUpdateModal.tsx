"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import CountryData from "../../CountryData.json";
import Input from "../inputs/Input";
import Heading from "../Heading";
import useProfileUpdateModal from "@/app/hooks/useUserUpdateModal";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import { toast } from "react-hot-toast";
import getCurrentUser from "../../actions/getCurrentUser";
import useUserUpdateModal from "@/app/hooks/useUserUpdateModal";
import CountrySelect from "../inputs/CountrySelect";
import { SafeUser } from "@/app/types";

interface currentUserProps {
  currentUser?: SafeUser | null;
}

const UserUpdateModal: React.FC<currentUserProps> = ({ currentUser }) => {
  const userUpdateModal = useUserUpdateModal();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<
    { state_id: string; state_name: string; country_id: string }[]
  >([]);
  const [stateid, setStateid] = useState<string | undefined>("");
  const [countryid, setCountryid] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      number: "",
      country: "",
      state: "",
      city: "",
      job: "",
      funFact: "",
      language: "",
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Japanese",
    "Chinese",
  ];

  const country = useMemo(() => {
    const selectedCountry = CountryData.find(
      (country) => country.country_id === currentUser?.country
    );
    return selectedCountry ? selectedCountry.country_name : "";
  }, [currentUser?.country]);

  const states = useMemo(() => {
    const selectedCountry = CountryData.find(
      (country) => country.country_id === currentUser?.country
    );
    if (selectedCountry) {
      const selectedState = selectedCountry.states.find(
        (state) => state.state_id === currentUser?.state
      );
      return selectedState ? selectedState.state_name : "";
    }
    return "";
  }, [currentUser?.country, currentUser?.state]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (currentUser) {
          setValue("name", currentUser.name || "");
          setValue("number", currentUser.number || "");
          setValue("country", country);
          setValue("state", states);
          setValue("city", currentUser.city || "");
          setValue("job", currentUser.job || "");
          setValue("funFact", currentUser.funFact || "");
          setValue("language", currentUser.language || "");
        }
      } catch (error) {
        // Handle error
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, [country, currentUser, setValue, states]);

  const handleCountry = (e: ChangeEvent<HTMLSelectElement>) => {
    const countryId = e.target.value;
    setCountryid(countryId);
    setCustomValue("country", countryId);
  };

  const handleState = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateId = e.target.value;
    setStateid(stateId);
    setCustomValue("state", stateId);
  };

  const selectedCountry = CountryData.find(
    (country) => country.country_id === countryid
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      if (countryid === "") {
        alert("Please select a Country.");
        return;
      }
      if (stateid === "") {
        alert("Please select a State.");
        return;
      }
      await axios.post("/api/profileUpdate", data);
      toast.success("Profile updated successfully!");
      reset();
      router.refresh();
      userUpdateModal.onClose();
    } catch (error) {
      toast.error("Error updating profile, please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="number"
        label="Contact"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="tel"
        required
      />
      <Input
        subtitle
        id="job"
        label="Profession/Skill"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <div className="w-full flex-col flex sm:flex-row pb-3">
        <div className="w-full sm:w-[50%]">
          <label className="block pb-2">Country</label>
          <select
            id="country"
            className="w-[95%] text-sm outline-none border py-2 px-3 border-gray-300 bg-white h-[40px] rounded-[5px] focus:ring-indigo-500 focus:border-indigo-500"
            {...register("country")}
            value={watch("country") || ""}
            onChange={(e) => handleCountry(e)}
            required
          >
            <option className="block pb-2" value="">
              Choose your Country
            </option>
            {CountryData.map((country) => (
              <option key={country.country_id} value={country.country_id}>
                {country.country_name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-[50%]">
          <label className="block pb-2">State</label>
          <select
            id="state"
            className="w-[95%] text-sm outline-none border py-2 px-3 border-gray-300 bg-white h-[40px] rounded-[5px] focus:ring-indigo-500 focus:border-indigo-500"
            {...register("state")}
            value={watch("state") || ""}
            onChange={(e) => handleState(e)}
            required
          >
            <option className="block pb-2" value="">
              Choose your State
            </option>
            {selectedCountry &&
              selectedCountry.states.map((state) => (
                <option key={state.state_id} value={state.state_id}>
                  {state.state_name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <select
        id="language"
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        {...register("language")}
        required
      >
        <option className="block pb-2" value="">
          Choose your Language
        </option>
        {languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
      {errors.language && (
        <span className="text-red-500">Language is required</span>
      )}
      <Input
        id="funFact"
        label="Fun Fact"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      open={userUpdateModal.open}
      title="Register"
      actionLabel="Continue"
      onClose={userUpdateModal.onClose}
      body={bodyContent}
      onSubmit={handleSubmit(onSubmit)}
      // footer={footerContent}
    />
  );
};

export default UserUpdateModal;
