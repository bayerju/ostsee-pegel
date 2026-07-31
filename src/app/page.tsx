import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  Check,
  Clock3,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Radio,
  ShieldCheck,
  SlidersHorizontal,
  Waves,
} from "lucide-react";

import { LoggedInMainPage } from "./_logged_in_main_page";
import { HydrateClient } from "~/trpc/server";

const locations = [
  "Kieler Bucht",
  "Lübecker Bucht",
  "Westlich Rügens",
  "Östlich Rügens",
  "Kleines Haff",
];

const steps = [
  {
    number: "01",
    title: "Region auswählen",
    text: "Wähle die Ostsee-Regionen aus, die für dich wichtig sind.",
  },
  {
    number: "02",
    title: "Grenzwerte festlegen",
    text: "Bestimme selbst, ab welchem Wasserstand du gewarnt werden möchtest.",
  },
  {
    number: "03",
    title: "Warnung erhalten",
    text: "Sobald dein Grenzwert erreicht wird, bekommst du eine Nachricht.",
  },
];

export default function Home() {
  return (
    <HydrateClient>
      <main className="overflow-hidden bg-[#f5f9f8] text-[#12302f]">
        <section className="relative isolate overflow-hidden bg-[#062d33] text-white">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_70%_20%,rgba(28,145,143,0.32),transparent_34%),linear-gradient(135deg,#062d33_0%,#0b4650_55%,#0d5962_100%)]" />
          <div className="absolute -right-24 top-28 -z-10 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -right-10 top-44 -z-10 h-56 w-56 rounded-full border border-white/10" />

          <div className="mx-auto grid min-h-[680px] max-w-7xl grid-cols-1 items-center gap-16 px-6 pb-28 pt-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:px-10 lg:pb-36 lg:pt-24">
            <div className="min-w-0 max-w-2xl">
              <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Wissen, wenn das
                <span className="block text-[#8ee3d7]">Wasser kommt.</span>
              </h1>

              <p className="text-white/72 mt-7 max-w-xl text-lg leading-8 sm:text-xl">
                Ostsee-Pegel beobachtet die Wasserstände für dich und warnt
                dich, sobald dein persönlicher Grenzwert erreicht wird. Einfach
                und ohne Kosten.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#f6c85f] px-7 text-base font-semibold text-[#153233] shadow-[0_12px_35px_rgba(246,200,95,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffda7c]"
                >
                  Warnungen einrichten
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="#so-funktionierts"
                  className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 px-7 text-base font-medium text-white transition hover:border-white/40 hover:bg-white/5"
                >
                  So funktioniert es
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/65">
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#8ee3d7]" /> Kein Abo
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#8ee3d7]" /> Keine Werbung
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#8ee3d7]" /> In 2 Minuten
                  eingerichtet
                </span>
              </div>
            </div>

            <div className="relative mx-auto w-full min-w-0 max-w-lg lg:mx-0 lg:justify-self-end">
              <div className="absolute -left-8 top-14 h-[75%] w-[75%] rounded-full bg-[#4cd1c0]/20 blur-3xl" />
              <div className="relative rotate-[1.5deg] rounded-[2rem] border border-white/15 bg-white/[0.09] p-3 shadow-2xl backdrop-blur-xl">
                <div className="rounded-[1.45rem] bg-[#f7fbfa] p-5 text-[#12302f] sm:p-7">
                  <div className="flex items-start justify-between gap-4 border-b border-[#dce9e6] pb-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#dff4f0] text-[#08766f]">
                        <BellRing className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm text-[#58706e]">Pegelwarnung</p>
                        <p className="font-semibold">Kieler Bucht</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#ffead1] px-3 py-1 text-xs font-semibold text-[#9b5516]">
                      Grenzwert erreicht
                    </span>
                  </div>

                  <div className="py-7">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-sm text-[#6a807e]">
                          Aktueller Wasserstand
                        </p>
                        <p className="mt-1 text-5xl font-semibold tracking-[-0.05em]">
                          128<span className="ml-2 text-xl">cm</span>
                        </p>
                      </div>
                      <div className="text-right text-sm text-[#6a807e]">
                        <p>Dein Grenzwert</p>
                        <p className="mt-1 font-semibold text-[#12302f]">
                          120 cm
                        </p>
                      </div>
                    </div>

                    <div className="relative mt-8 h-20 overflow-hidden rounded-2xl bg-[#dcefed]">
                      <div className="absolute inset-x-0 bottom-0 h-[58%] bg-[#25a69d]" />
                      <svg
                        viewBox="0 0 600 80"
                        preserveAspectRatio="none"
                        className="absolute inset-x-0 bottom-[50%] h-10 w-full text-[#25a69d]"
                        aria-hidden="true"
                      >
                        <path
                          d="M0 45 C75 5 125 75 210 35 C300 -5 350 70 440 32 C510 2 560 22 600 40 V80 H0 Z"
                          fill="currentColor"
                        />
                      </svg>
                      <div className="absolute left-[62%] top-0 h-full border-l-2 border-dashed border-[#ee9d41]" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-[#e8f4f2] p-4">
                    <MessageCircle className="h-5 w-5 text-[#08766f]" />
                    <p className="text-sm leading-5">
                      <span className="font-semibold">Warnung versendet</span>
                      <span className="block text-[#647b78]">
                        per Telegram · gerade eben
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-5 -rotate-2 rounded-2xl border border-white/50 bg-white px-4 py-3 text-[#12302f] shadow-xl sm:-left-12">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e4f5f1] text-[#08766f]">
                    <Clock3 className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs text-[#6a807e]">Automatisch</p>
                    <p className="text-sm font-semibold">Rund um die Uhr</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-16 w-full text-[#f5f9f8] sm:h-24"
            aria-hidden="true"
          >
            <path
              d="M0 55 C210 100 340 18 555 52 C770 86 940 8 1160 42 C1280 60 1360 72 1440 58 V100 H0 Z"
              fill="currentColor"
            />
          </svg>
        </section>

        <LoggedInMainPage />

        <section
          id="warum-kostenlos"
          className="scroll-mt-20 px-6 py-20 sm:py-28 lg:px-10"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
              <div>
                <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  Warnungen sollten für alle da sein.
                </h2>
                <p className="mt-5 max-w-md text-lg leading-8 text-[#5a716f]">
                  Deshalb bleibt Ostsee-Pegel kostenlos und konzentriert sich
                  auf eine Aufgabe: Menschen rechtzeitig zu informieren.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <article className="rounded-3xl border border-[#dce8e5] bg-white p-7 shadow-[0_12px_40px_rgba(14,61,59,0.06)]">
                  <HeartHandshake className="h-7 w-7 text-[#08766f]" />
                  <h3 className="mt-8 text-xl font-semibold">
                    Für immer kostenlos
                  </h3>
                  <p className="mt-3 leading-7 text-[#5a716f]">
                    Keine Probephase, kein Abo und keine versteckten Kosten. Der
                    Schutz vor Hochwasser ist der einzige Zweck dieses Projekts.
                  </p>
                </article>
                <article className="rounded-3xl border border-[#dce8e5] bg-[#e3f2ef] p-7">
                  <ShieldCheck className="h-7 w-7 text-[#08766f]" />
                  <h3 className="mt-8 text-xl font-semibold">
                    Einfach und selbstbestimmt
                  </h3>
                  <p className="mt-3 leading-7 text-[#5a716f]">
                    Du entscheidest, welche Region und welcher Wasserstand für
                    dich relevant sind. Wir melden uns nur, wenn es wichtig ist.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section
          id="so-funktionierts"
          className="scroll-mt-20 bg-white px-6 py-20 sm:py-28 lg:px-10"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Drei Schritte bis zur persönlichen Warnung.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#5a716f]">
                Die Einrichtung dauert nur wenige Minuten.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-[#dce8e5] bg-[#dce8e5] lg:grid-cols-3">
              {steps.map((step, index) => {
                const Icon = [MapPin, SlidersHorizontal, BellRing][index]!;
                return (
                  <article
                    key={step.number}
                    className="relative bg-white p-8 sm:p-10"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e3f2ef] text-[#08766f]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-semibold text-[#a1b3b1]">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="mt-10 text-xl font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-7 text-[#5a716f]">{step.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="regionen"
          className="scroll-mt-20 px-6 py-20 sm:py-28 lg:px-10"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-24">
            <div className="relative min-h-[430px] overflow-hidden rounded-[2rem] bg-[#0a4a50] p-8 text-white sm:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(100,211,197,0.2),transparent_30%)]" />
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
              <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full border border-white/10" />
              <div className="relative">
                <div className="flex items-center gap-3 text-[#9ce6dc]">
                  <Radio className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    Überwachte Regionen
                  </span>
                </div>
                <div className="mt-10 space-y-3">
                  {locations.map((location, index) => (
                    <div
                      key={location}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4 backdrop-blur-sm"
                    >
                      <span className="flex items-center gap-3 font-medium">
                        <span className="h-2 w-2 rounded-full bg-[#6dd8cb] shadow-[0_0_0_5px_rgba(109,216,203,0.12)]" />
                        {location}
                      </span>
                      <span className="text-xs text-white/50">
                        0{index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Relevante Pegelstände, direkt bei dir.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#5a716f]">
                Ostsee-Pegel wertet öffentlich verfügbare Wasserstandsdaten des
                Bundesamts für Seeschifffahrt und Hydrographie aus. Sobald dein
                gewählter Wert erreicht wird, senden wir dir eine Warnung.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e3f2ef] text-[#08766f]">
                    <Waves className="h-5 w-5" />
                  </span>
                  <span className="font-medium">Regelmäßige Pegelprüfung</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e3f2ef] text-[#08766f]">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <span className="font-medium">
                    Benachrichtigung per Telegram oder SMS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 pt-6 sm:pb-28 lg:px-10">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#f2c75c] px-7 py-14 text-center text-[#173333] sm:px-12 sm:py-20">
            <div className="absolute left-0 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#173333]/10" />
            <div className="absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 translate-x-1/2 rounded-full border border-[#173333]/10" />
            <div className="relative mx-auto max-w-3xl">
              <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Richte jetzt deine persönliche Pegelwarnung ein.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#294a49]">
                Zwei Minuten, die im richtigen Moment den Unterschied machen
                können.
              </p>
              <Link
                href="/signup"
                className="group mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#123638] px-8 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0b292b]"
              >
                Kostenlos Warnung einrichten
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-5 text-[#718482]">
            Ostsee-Pegel ist ein unabhängiges Projekt und kein amtlicher
            Warndienst. Beachte bei Gefahr immer die Hinweise der zuständigen
            Behörden.
          </p>
        </section>
      </main>
    </HydrateClient>
  );
}
