"use client";

import { useState } from "react";
import RevealOnScroll from "../RevealOnScroll";

type Faq = { q: string; a: string };

export default function GeneralInformation() {
  const faqs: Faq[] = [
    { q: "How do creators get paid?", a: "Members subscribe to your tiers; payouts are processed to your account via Stripe based on your payout setup." },
    { q: "What fees does Ekstra charge?", a: "Ekstra charges 5% per successful transaction, plus Xendit’s billing fee depending on the payment method. There are no setup or monthly fees." },
    { q: "Can I change tier prices later?", a: "Yes. You can edit tiers anytime. Existing members keep their current price unless you migrate them." },
    { q: "Can fans cancel anytime?", a: "Yes. Memberships are month‑to‑month by default." },
  ];

  // allow multiple open; use a Set to track open indexes
  const [open, setOpen] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setOpen(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <RevealOnScroll>
      <section id="faq" className="py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Frequently asked questions</h2>
            <p className="mt-3">Short answers to help you decide quicker.</p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl border rounded-2xl border-white/40 bg-white/30 p-6 md:p-8 shadow-xl backdrop-blur-md">
            {faqs.map((item, i) => {
              const isOpen = open.has(i);
              return (
                <div key={i} className="p-6">
                  <button
                    onClick={() => toggle(i)}
                    className="flex w-full items-center justify-between gap-4 text-left text-base font-medium outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={`panel-${i}`}
                  >
                    {item.q}
                    <span
                      className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      aria-hidden
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                        <path d="M12 2v20M2 12h20" />
                      </svg>
                    </span>
                  </button>

                  {/* Animated panel: stays mounted, so transitions run */}
                  <div
                    id={`panel-${i}`}
                    className={`
                      grid transition-[grid-template-rows,opacity] duration-300 ease-out
                      ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                    `}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-3 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  </div>

                  {/* Divider */}
                  {i < faqs.length - 1 && <div className="mt-6 h-px w-full bg-white/20" />}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
}
