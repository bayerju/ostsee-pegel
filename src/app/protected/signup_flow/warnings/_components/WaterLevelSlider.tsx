"use client";

import { useState } from "react";

interface WaterLevelSliderProps {
  label: string;
  name: string;
  defaultValue: string;
  min: string;
  max: string;
  standardText?: string;
  value: string;
  onChange: (value: string) => void;
}

export function WaterLevelSlider({
  label,
  name,
  defaultValue,
  min,
  max,
  standardText,
  value,
  onChange,
}: WaterLevelSliderProps) {
  const [localValue, setLocalValue] = useState(defaultValue);

  return (
    <div>
      <label className="mb-2 block text-lg">
        {label}
        <span className="ml-2 text-sm text-[#8edfd5]">
          Warnung bei{" "}
          {name.includes("high") ? "Überschreitung" : "Unterschreitung"}
        </span>
      </label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          name={name}
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer accent-[#77d8cc]"
        />
        <span className="min-w-[4rem] text-center font-medium text-[#8edfd5]">
          {Number(value) > 0 ? "+" : ""}
          {value} cm
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span>{min} cm</span>
        <span className="text-[#8edfd5]">{standardText}</span>
        <span>{max} cm</span>
      </div>
    </div>
  );
}
