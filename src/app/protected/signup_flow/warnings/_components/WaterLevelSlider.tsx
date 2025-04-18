"use client";

import { useState } from "react";

interface WaterLevelSliderProps {
  label: string;
  name: string;
  defaultValue: string;
  min: string;
  max: string;
  standardText?: string;
  showPlus?: boolean;
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
  showPlus = false,
  value,
  onChange,
}: WaterLevelSliderProps) {
  const [localValue, setLocalValue] = useState(defaultValue);

  return (
    <div>
      <label className="mb-2 block text-lg">
        {label}
        <span className="ml-2 text-sm text-blue-300">
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
          className="w-full accent-blue-400"
        />
        <span className="min-w-[4rem] text-center text-blue-300">
          {showPlus && value !== "0" ? "+" : ""}
          {value} cm
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span>{min} cm</span>
        <span className="text-blue-300">{standardText}</span>
        <span>{max} cm</span>
      </div>
    </div>
  );
}
