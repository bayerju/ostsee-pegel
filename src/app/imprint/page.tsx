import { env } from "~/env";

export default async function Imprint() {
  // You can fetch from environment variables
  const imprint = {
    name: env.IMPRINT_NAME,
    address: env.IMPRINT_ADDRESS,
    city: env.IMPRINT_CITY,
    email: env.IMPRINT_EMAIL,
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Impressum</h1>

      <section className="mb-6">
        <h2 className="mb-4 text-xl font-semibold">Angaben gemäß § 5 TMG</h2>
        <p>{imprint.name}</p>
        <p>{imprint.address}</p>
        <p>{imprint.city}</p>
      </section>

      <section className="mb-6">
        <h2 className="mb-4 text-xl font-semibold">Kontakt</h2>
        <p>E-Mail: {imprint.email}</p>
      </section>

      {/* <section className="mb-6">
        <h2 className="mb-4 text-xl font-semibold">Umsatzsteuer-ID</h2>
        <p>Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:</p>
        <p>DE123456789</p>
      </section> */}

      <section className="mb-6">
        <h2 className="mb-4 text-xl font-semibold">
          Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
        </h2>
        <p>{imprint.name}</p>
        <p>{imprint.address}</p>
        <p>{imprint.city}</p>
      </section>
    </div>
  );
}
