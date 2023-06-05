import React from "react";

interface TimeInputProps {
  onChange: (value: string) => void;
  value: string | number;
  title: string;
  subtitle: string;
}

const TimeInput: React.FC<TimeInputProps> = ({
  onChange,
  value,
  title,
  subtitle,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const formattedValue = String(value); // Convert value to string

  return (
    <div className="flex flex-col">
      <div className="font-medium">{title}</div>
      <input
        type="time"
        value={formattedValue}
        onChange={handleInputChange}
        className="py-1"
      />
      <div className="font-light text-gray-600">{subtitle}</div>
    </div>
  );
};

export default TimeInput;
