"use client"

import RevealOnScroll from "../RevealOnScroll";
import Link from "next/link";

export default function Pricing() {
  return(
    <RevealOnScroll>
      <section id="pricing" className="border-y border-white/5 bg-white/5 py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Simple, creator‑friendly pricing
            </h2>
            <p className="mt-3 text-slate-300">
              Free to start. We only earn when you do.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h3 className="text-lg font-semibold">Pay as you earn</h3>

              <div className="mt-4 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm text-slate-400">Platform fee</div>
                  <div className="mt-1 text-2xl font-bold">5%</div>
                  <p className="mt-2 text-sm text-slate-300">
                    Charged per successful transaction.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm text-slate-400">Payment processing</div>
                  <div className="mt-1 text-2xl font-bold">Stripe</div>
                  <p className="mt-2 text-sm text-slate-300">
                    Stripe billing fees apply based on payment method.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm text-slate-400">Setup & monthly</div>
                  <div className="mt-1 text-2xl font-bold">$ 0</div>
                  <p className="mt-2 text-sm text-slate-300">
                    No setup cost. No monthly subscription.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold">Example</div>
                <p className="mt-2 text-sm text-slate-300">
                  If a fan pays $100.00 for a tier, Ekstra takes 5% ($5) + Xendit’s
                  billing fee. The remainder goes to you.
                </p>
              </div>

              <div className="mt-6">
                <Link
                  href="/creator/onboarding"
                  className="inline-flex w-full justify-center rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:brightness-95"
                >
                  Start earning
                </Link>
              </div>

              <p className="mt-4 text-xs text-slate-400">
                * Stripe fees vary by payment method and are subject to change per Xendit’s pricing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </RevealOnScroll>
  )
}