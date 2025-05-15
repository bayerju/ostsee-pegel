import React from "react";
import { env } from "~/env";

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Datenschutzerklärung</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">1. Verantwortlicher</h2>
        <p>
          {env.IMPRINT_NAME}
          <br />
          {env.IMPRINT_ADDRESS}
          <br />
          {env.IMPRINT_CITY}
          <br />
          Deutschland
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          2. Datenschutz auf einen Blick
        </h2>
        <h3 className="mb-2 text-xl font-semibold">2.1 Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was
          mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website
          besuchen.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          3. Datenerfassung auf dieser Website
        </h2>
        <h3 className="mb-2 text-xl font-semibold">
          3.1 Verantwortlich für die Datenverarbeitung
        </h3>
        <p>
          Die Datenverarbeitung auf dieser Website erfolgt durch den
          Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser
          Website entnehmen.
        </p>

        <h3 className="mb-2 mt-4 text-xl font-semibold">3.2 Datenerfassung</h3>
        <p>
          Wir verarbeiten personenbezogene Daten nur, wenn dies für den Betrieb
          der Website und die Erbringung unserer Dienstleistungen erforderlich
          ist. Die Erhebung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO
          (Vertragserfüllung) oder Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
          Dazu zählen unter anderem:
        </p>
        <ul className="mb-4 ml-6 list-disc">
          <li>Name (bei Registrierung und Kontaktaufnahme)</li>
          <li>E-Mail-Adresse (für die Kommunikation und Benachrichtigungen)</li>
          <li>Adresse (für Rechnungsstellung und Lieferung)</li>
          <li>Telefonnummer (für wichtige Benachrichtigungen)</li>
          <li>IP-Adresse (für Sicherheitsmaßnahmen)</li>
          <li>
            Notwendige Daten zur Zahlungsabwicklung (Kreditkarteninformationen,
            Bankdaten, etc.)
          </li>
        </ul>
        <p>
          Diese Daten werden auf unserem Server bei Hetzner gespeichert und
          entsprechend der geltenden Datenschutzbestimmungen sicher verwahrt.
          Die Speicherung erfolgt nur so lange, wie es für die genannten Zwecke
          erforderlich ist.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          4. Benachrichtigungsdienste
        </h2>
        <p>Wir nutzen folgende Dienste für die Benachrichtigung:</p>
        <ul className="mb-4 ml-6 list-disc">
          <li>Telegram (eigene Implementation)</li>
          <li>E-Mail (Plunk)</li>
          <li>SMS und WhatsApp (Twilio)</li>
        </ul>
        <p>
          Die Datenverarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6
          Abs. 1 lit. a DSGVO).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">5. Zahlungsabwicklung</h2>
        <p>
          Für die Zahlungsabwicklung nutzen wir Stripe. Die Datenschutzerklärung
          von Stripe finden Sie unter:{" "}
          <a href="https://stripe.com/at/privacy" className="hover:underline">
            https://stripe.com/at/privacy
          </a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">6. Analytics</h2>
        <p>
          Wir nutzen PostHog für die Analyse des Nutzerverhaltens. Die
          Datenschutzerklärung von PostHog finden Sie unter:{" "}
          <a href="https://posthog.com/privacy" className="hover:underline">
            https://posthog.com/privacy
          </a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">7. Cookies</h2>
        <p>
          Diese Website verwendet Cookies ausschließlich für die
          Authentifizierung. Diese sind für den Betrieb der Website notwendig.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">8. Newsletter</h2>
        <p>
          Wir behalten uns vor, in Zukunft einen Newsletter anzubieten. Die
          Einwilligung zur Newsletter-Anmeldung können Sie jederzeit widerrufen.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">9. Ihre Rechte</h2>
        <p>Sie haben folgende Rechte:</p>
        <ul className="mb-4 ml-6 list-disc">
          <li>Recht auf Auskunft</li>
          <li>Recht auf Berichtigung</li>
          <li>Recht auf Löschung</li>
          <li>Recht auf Einschränkung der Verarbeitung</li>
          <li>Recht auf Datenübertragbarkeit</li>
          <li>Widerspruchsrecht</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">10. Kontakt</h2>
        <p>
          Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer
          personenbezogenen Daten, bei Auskünften, Berichtigung, Sperrung oder
          Löschung von Daten wenden Sie sich bitte an:
        </p>
        <p>
          Musterfirma GmbH
          <br />
          Musterstraße 123
          <br />
          12345 Musterstadt
          <br />
          Deutschland
          <br />
          E-Mail: datenschutz@musterfirma.de
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">11. Änderungen</h2>
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie
          stets den aktuellen rechtlichen Anforderungen entspricht oder um
          Änderungen unserer Leistungen umzusetzen.
        </p>
      </section>
    </div>
  );
}
