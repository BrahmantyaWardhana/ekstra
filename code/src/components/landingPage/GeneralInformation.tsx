"use client"

import RevealOnScroll from "../RevealOnScroll";

export default function GeneralInformation() {
  return(
    <RevealOnScroll>
      <section id="faq" className="py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-slate-300">
              Short answers to help you decide quicker.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
            {[
              {
                q: "How do creators get paid?",
                a: "Members subscribe to your tiers; payouts are processed to your account via Xendit based on your payout setup.",
              },
              {
                q: "What fees does Ekstra charge?",
                a: "Ekstra charges 5% per successful transaction, plus Xendit’s billing fee depending on the payment method. There are no setup or monthly fees.",
              },
              {
                q: "Can I change tier prices later?",
                a: "Yes. You can edit tiers anytime. Existing members keep their current price unless you migrate them.",
              },
              {
                q: "Can fans cancel anytime?",
                a: "Yes. Memberships are month‑to‑month by default.",
              },
            ].map((item, i) => (
              <details key={i} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-medium text-slate-200">
                  {item.q}
                  <span className="transition group-open:rotate-45">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="size-5"
                    >
                      <path d="M12 2v20M2 12h20" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-300">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </RevealOnScroll>
  )
}