export function Footer() {
  return (
    <footer className="bg-gray-400 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-4">
          <a href="/imprint" className="text-gray-800 hover:text-gray-900">
            Impressum
          </a>
          <a href="/privacy-policy" className="text-gray-800 hover:text-gray-900">
            Datenschutzvereinbarung
          </a>
        </div>
      </div>
    </footer>
  );
}
