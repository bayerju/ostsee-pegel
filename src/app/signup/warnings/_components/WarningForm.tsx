"use client";

import { useState } from "react";
import { WaterLevelSlider } from "./WaterLevelSlider";
import { setFirstWarning } from "~/app/warnings/actions";

interface WarningFormProps {
  regions: string[];
  lastWarning: {
    regions?: string[];
    highWaterThreshold?: number;
    lowWaterThreshold?: number;
  } | null;
  submitButtonText?: string;
  redirectTo?: string;
}

export function WarningForm({
  regions,
  lastWarning,
  submitButtonText = "Weiter zu Benachrichtigungen",
  redirectTo = "/signup/notifications",
}: WarningFormProps) {
  const [selectedRegions, setSelectedRegions] = useState<string[]>(
    lastWarning?.regions ?? [],
  );

  return (
    <form action={setFirstWarning} className="space-y-6">
      {/* Regions Selection */}
      <div>
        <label className="mb-2 block text-lg">Regionen auswählen</label>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {regions.map((region) => (
            <label key={region} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="regions"
                value={region}
                className="h-4 w-4"
                defaultChecked={lastWarning?.regions?.includes(region)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRegions([...selectedRegions, region]);
                  } else {
                    setSelectedRegions(
                      selectedRegions.filter((r) => r !== region),
                    );
                  }
                }}
              />
              <span>{region}</span>
            </label>
          ))}
        </div>
        {/* <p className="mt-2 text-sm text-red-400">
          ⚠️ Bitte mindestens eine Region auswählen
        </p> */}
      </div>

      {/* Water Level Sliders */}
      <WaterLevelSlider
        label="Hochwasser-Schwellenwert"
        name="highWaterThreshold"
        defaultValue={lastWarning?.highWaterThreshold?.toString() ?? "50"}
        min="0"
        max="100"
        showPlus
      />

      <WaterLevelSlider
        label="Niedrigwasser-Schwellenwert"
        name="lowWaterThreshold"
        defaultValue={lastWarning?.lowWaterThreshold?.toString() ?? "-70"}
        min="-100"
        max="0"
      />

      <p className="text-sm text-gray-300">
        Sie erhalten Benachrichtigungen, wenn der Wasserstand über den
        Hochwasser-Schwellenwert steigt oder unter den
        Niedrigwasser-Schwellenwert fällt. Der Normalwasserstand ist als 0 cm
        definiert.
      </p>

      <div className="flex flex-col items-center justify-center">
        <button
          formAction={setFirstWarning}
          type="submit"
          disabled={selectedRegions.length === 0}
          className="w-full rounded-full bg-blue-500 px-8 py-3 text-lg font-semibold transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitButtonText}
        </button>
        {selectedRegions.length === 0 && (
          <label className="text-sm text-red-400">
            ⚠️ Bitte mindestens eine Region auswählen
          </label>
        )}
      </div>
    </form>
  );
}
