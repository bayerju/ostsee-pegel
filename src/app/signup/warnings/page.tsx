import Link from "next/link";
import { setWarnings } from "~/app/warnings/actions";
import { WaterLevelSlider } from "./_components/WaterLevelSlider";

export default function WarningsSetupPage() {
  const regions = [
    "Kieler Bucht",
    "Lübecker Bucht",
    "Westlich Rügens",
    "Östlich Rügens",
    "Kleines Haff",
  ];

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#0066cc] to-[#001a33] text-white">
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/signup" className="text-blue-300 hover:text-blue-400">
            ← Zurück
          </Link>
          <div className="text-sm text-gray-300">Schritt 2 von 3</div>
        </div>

        <h1 className="mb-8 text-3xl font-bold">Warnungen einrichten</h1>

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
                  />
                  <span>{region}</span>
                </label>
              ))}
            </div>
          </div>

          {/* High Water Threshold */}
          <WaterLevelSlider
            label="Hochwasser-Schwellenwert"
            name="highWaterThreshold"
            defaultValue="50"
            min="0"
            max="100"
            standardText="Standard: 50 cm über Normal"
            showPlus
          />

          {/* Low Water Threshold */}
          <WaterLevelSlider
            label="Niedrigwasser-Schwellenwert"
            name="lowWaterThreshold"
            defaultValue="-30"
            min="-100"
            max="0"
            standardText="Standard: 30 cm unter Normal"
          />

          <p className="text-sm text-gray-300">
            Sie erhalten Benachrichtigungen, wenn der Wasserstand über den
            Hochwasser-Schwellenwert steigt oder unter den
            Niedrigwasser-Schwellenwert fällt. Der Normalwasserstand ist als 0
            cm definiert.
          </p>

          <button
            formAction={setWarnings}
            type="submit"
            className="w-full rounded-full bg-blue-500 px-8 py-3 text-lg font-semibold transition-colors hover:bg-blue-600"
          >
            Weiter zu Benachrichtigungen
          </button>
        </form>
      </div>
    </main>
  );
}
