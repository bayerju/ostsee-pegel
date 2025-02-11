interface NotificationOptionProps {
  title: string;
  description: string;
  isSelected?: boolean;
  children?: React.ReactNode;
  isPremium?: boolean;
  price?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function NotificationOption({
  title,
  description,
  isSelected,
  isPremium,
  price,
  disabled,
  onClick,
  children,
}: NotificationOptionProps) {
  if (!isSelected) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="flex w-full items-center justify-between rounded-lg border border-white/20 bg-white/5 p-6 text-left transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-gray-300">{description}</p>
        </div>
        {isPremium ? (
          <div className="text-right">
            <div className="text-sm text-yellow-400">Premium</div>
            <div className="text-sm text-gray-300">{price}</div>
          </div>
        ) : (
          <span className="text-sm text-green-400">Kostenlos</span>
        )}
      </button>
    );
  }

  return <div>{children}</div>;
}
