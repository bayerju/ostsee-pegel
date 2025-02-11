import { Button } from "~/components/ui/button";

interface TelegramSetupProps {
  onBack: () => void;
}

export function TelegramSetup({ onBack }: TelegramSetupProps) {
  return (
    <>
      <div className="space-y-4 rounded-lg border border-white/20 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Telegram</h2>
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-blue-300 hover:text-blue-400"
          >
            Andere Methode wählen
          </button>
        </div>
        <div>
          <label className="mb-2 block text-lg">Telegram Benutzername</label>
          <input
            type="text"
            name="telegramUsername"
            placeholder="@benutzername"
            className="w-full rounded-lg border border-white/20 bg-white/10 p-3 focus:border-blue-400 focus:outline-none"
          />
          <p className="mt-2 text-sm text-gray-300">
            Ohne das @ Symbol eingeben
          </p>
        </div>

        <div className=" p-6">
            <h2 className="mb-4 text-xl font-semibold">Nächste Schritte:</h2>
            <ol className="list-inside list-decimal space-y-2">
            <li>Öffnen Sie Telegram</li>
            <li>Suchen Sie nach unserem Bot: @OstseeWasserBot</li>
            <li>Starten Sie den Bot mit dem /start Befehl</li>
            <li>Sie erhalten eine Bestätigungsnachricht</li>
          </ol>
        </div>
        <Button>Ersteinrichtung abschließen</Button>
      </div>
    </>
  );
}
