export function Footer() {
  return (
    <footer className="">
      <div className="container mx-auto max-w-3xl bg-gray-400">
        <div className="flex justify-center space-x-4">
          <a href="/imprint" className="text-gray-800 hover:text-gray-900">
            Impressum
          </a>
          <a
            href="/privacy-policy"
            className="text-gray-800 hover:text-gray-900"
          >
            Datenschutzvereinbarung
          </a>
        </div>
      </div>
    </footer>
  );
}
