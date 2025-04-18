"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { WaterLevelSlider } from "./WaterLevelSlider";
import { setFirstWarning } from "~/app/protected/warnings/actions";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { isNil } from "lodash";

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
  submitButtonText = "Weiter zu Benachrichtigungen",
  lastWarning,
}: WarningFormProps) {
  const router = useRouter();
  const { data: firstWarningQuery } = api.warnings.getFirstWarning.useQuery();
  const pathName = usePathname();
  const submitWarningMutation = api.warnings.updateWarning.useMutation({
    onSuccess: (data) => {
      // invalidate
      toast.success(`gespeichert`);
      if (pathName.endsWith("/protected/signup_flow/warnings")) {
        router.push("/protected/signup_flow/notifications");
      }
    },
  });
  // const [state, formAction] = useActionState(setFirstWarning, { message: "" });
  const [selectedRegions, setSelectedRegions] = useState<string[] | null>(
    lastWarning?.regions ?? null,
  );
  const [highWaterThreshold, setHighWaterThreshold] = useState<string | null>(
    lastWarning?.highWaterThreshold?.toString() ?? "50",
  );
  const [lowWaterThreshold, setLowWaterThreshold] = useState<string | null>(
    lastWarning?.lowWaterThreshold?.toString() ?? "-70",
  );

  // useEffect(() => {
  //   if (isNil(selectedRegions)) {
  //     setSelectedRegions(firstWarningQuery?.regions ?? []);
  //   }
  //   if (isNil(highWaterThreshold)) {
  //     setHighWaterThreshold(
  //       firstWarningQuery?.highWaterThreshold?.toString() ?? "50",
  //     );
  //   }
  //   if (isNil(lowWaterThreshold)) {
  //     setLowWaterThreshold(
  //       firstWarningQuery?.lowWaterThreshold?.toString() ?? "-70",
  //     );
  //   }
  // }, [firstWarningQuery]);

  if (firstWarningQuery === undefined) {
    return <div>Loading...</div>;
  }

  // if (firstWarningQuery === null) {
  //   redirect("/protected/signup_flow/warnings");
  // }

  return (
    <form className="space-y-6">
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
                    setSelectedRegions((prev) => {
                      if (isNil(prev)) {
                        return [region];
                      }
                      return [...prev, region];
                    });
                  } else {
                    setSelectedRegions((prev) => {
                      if (isNil(prev)) {
                        return [];
                      }
                      return prev.filter((r) => r !== region);
                    });
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
        defaultValue={highWaterThreshold ?? "50"}
        min="0"
        max="100"
        showPlus
        value={highWaterThreshold ?? "50"}
        onChange={setHighWaterThreshold}
      />

      <WaterLevelSlider
        label="Niedrigwasser-Schwellenwert"
        name="lowWaterThreshold"
        defaultValue={lowWaterThreshold ?? "-70"}
        min="-100"
        max="0"
        value={lowWaterThreshold ?? "-70"}
        onChange={setLowWaterThreshold}
      />

      <p className="text-sm text-gray-300">
        Sie erhalten Benachrichtigungen, wenn der Wasserstand über den
        Hochwasser-Schwellenwert steigt oder unter den
        Niedrigwasser-Schwellenwert fällt. Der Normalwasserstand ist als 0 cm
        definiert.
      </p>

      <div className="flex flex-col items-center justify-center">
        <SubmitButton
          buttonText={submitButtonText}
          pending={submitWarningMutation.isPending}
          onClick={() => {
            if (
              isNil(selectedRegions) ||
              isNil(highWaterThreshold) ||
              isNil(lowWaterThreshold)
            ) {
              return;
            }
            submitWarningMutation.mutate({
              regions: selectedRegions,
              highWaterThreshold: parseInt(highWaterThreshold),
              lowWaterThreshold: parseInt(lowWaterThreshold),
            });
          }}
        />
        {/* <button
          formAction={formAction}
          type="submit"
          disabled={selectedRegions.length === 0}
          className="w-full rounded-full bg-blue-500 px-8 py-3 text-lg font-semibold transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitButtonText}
        </button> */}
        {selectedRegions?.length === 0 && (
          <label className="text-sm text-red-400">
            ⚠️ Bitte mindestens eine Region auswählen
          </label>
        )}
      </div>
    </form>
  );
}

function SubmitButton(props: {
  buttonText: string;
  onClick: () => void;
  pending: boolean;
}) {
  // const { pending } = useFormStatus();
  return (
    <button
      type="button"
      disabled={props.pending}
      className="w-full rounded-full bg-blue-500 px-8 py-3 text-lg font-semibold transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
      onClick={props.onClick}
    >
      {props.pending ? "Speichern..." : props.buttonText}
    </button>
  );
}
