interface NotificationOptionProps {
  title: string;
  description: string;
  isSelected?: boolean;
  children?: React.ReactNode;
  isPremium?: boolean;
  price?: string;
  disabled?: boolean;
  onClick?: () => void;
  comingSoon?: boolean;
}

export function NotificationOption({
  title,
  description,
  isSelected,
  isPremium,
  price,
  onClick,
  children,
  comingSoon,
}: NotificationOptionProps) {
  if (!isSelected) {
    return (
      <button
        onClick={onClick}
        disabled={comingSoon}
        className="group relative flex w-full items-center justify-between overflow-hidden rounded-lg border border-white/20 bg-white/5 p-6 text-left transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {comingSoon && (
          <div className="absolute -right-12 top-5 rotate-[30deg] transform">
            <div className="w-[200px] bg-red-500/10 py-1 text-center">
              <span className="text-sm font-medium text-red-500">
                Bald verfügbar
              </span>
            </div>
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-gray-300">{description}</p>
        </div>
        {!comingSoon &&
          (isPremium ? (
            <div className="text-right">
              <div className="text-sm text-yellow-400">Premium</div>
              <div className="text-sm text-gray-300">{price}</div>
            </div>
          ) : (
            <span className="text-sm text-green-400">Kostenlos</span>
          ))}
      </button>
    );
  }

  return <div>{children}</div>;
}
