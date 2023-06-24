"use client";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label?: string;
  subtitle?: boolean;
  type?: "text" | "number" | "tel" | "password";
  disabled?: boolean;
  text?: boolean;
  placeholder?: string;
  textarea?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  watch?: UseFormWatch<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  text,
  subtitle,
  formatPrice,
  register,
  required,
  errors,
  watch,
  setValue,
  textarea,
  placeholder,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700
              absolute top-5 left-2"
        />
      )}

      {textarea ? (
        <div>
          <label
            className={` pb-1  ${
              errors[id] ? "text-rose-500" : "text-zinc-400"
            }`}
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id={id}
            cols="30"
            rows="8"
            {...register(id, { required })}
            name={id}
            defaultValue={watch ? watch(id) : ""}
            className={`
             peer w-full p-4 pt-7 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
             ${formatPrice ? "pl-9" : "pl-4"}
             ${
               errors[id]
                 ? "border-rose-500 focus:border-rose-500"
                 : "border-neutral-300 focus:border-black"
             }
           `}
            onChange={(e) => setValue?.(id, e.target.value)}
            placeholder="Enter your product description..."
          ></textarea>
        </div>
      ) : (
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder={placeholder ? placeholder : ""}
          type={type}
          className={`
             peer w-full p-4 pt-7 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
             ${formatPrice ? "pl-9" : "pl-4"}
             ${
               errors[id]
                 ? "border-rose-500 focus:border-rose-500"
                 : "border-neutral-300 focus:border-black"
             }
           `}
        />
      )}

      <label
        className={`
            absolute text-md duration-150 transform -translate-y-3 top-5 z-10 
            origin-[0] ${
              formatPrice ? "left-9" : "left-4"
            } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75
            peer-focus:-translate-y-4
            ${errors[id] ? "text-rose-500" : "text-zinc-400"}
          `}
      >
        {label}
      </label>
      {subtitle && (
        <div className="text-zinc-400">
          State your profession, skill or trade
        </div>
      )}
    </div>
  );
};

export default Input;
