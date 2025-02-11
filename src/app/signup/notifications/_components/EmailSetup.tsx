interface EmailSetupProps {
  onBack: () => void;
}

export function EmailSetup({ onBack }: EmailSetupProps) {
  return (
    <div className="space-y-4 rounded-lg border border-white/20 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">E-Mail</h2>
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-blue-300 hover:text-blue-400"
        >
          Andere Methode wählen
        </button>
      </div>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="emailNotifications"
          className="h-4 w-4"
          defaultChecked
        />
        <span>E-Mail Benachrichtigungen aktivieren</span>
      </label>
    </div>
  );
}
