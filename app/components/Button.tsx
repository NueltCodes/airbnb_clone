"use client";
import { IconType } from "react-icons/lib";

interface ButtonProps {
  label: string | undefined;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-full disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition ${
        outline
          ? "bg-white text-black border-black"
          : "bg-[#0B3A2C] border-[#0B3A2C] text-white"
      } ${
        small
          ? "py-1 text-sm font-light border-[1px]"
          : "py-3 text-md font-semibold border-2"
      }
    `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
          absolute
          left-4
          top-3
        "
        />
      )}
      {label}
    </button>
  );
};

export default Button;
