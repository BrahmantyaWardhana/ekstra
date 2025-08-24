"use client"

import RevealOnScroll from "../RevealOnScroll";
import Link from "next/link";

export default function Pricing() {
  return (
    <RevealOnScroll>
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Simple, creator‑friendly pricing
            </h2>
            <p className="mt-3 text-slate-700">
              Free to start. We only earn when you do.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            {/* Outer frosted card */}
            <div className="relative rounded-2xl border border-white/40 bg-white/30 p-6 md:p-8 shadow-xl backdrop-blur-md">
              <h3 className="text-lg font-semibold text-slate-900">Pay as you earn</h3>

              {/* Inner stat cards */}
              <div className="mt-4 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl border border-white/40 bg-white/30 p-4 backdrop-blur-md shadow">
                  <div className="text-sm text-slate-600">Platform fee</div>
                  <div className="mt-1 text-2xl font-bold text-slate-900">5%</div>
                  <p className="mt-2 text-sm text-slate-700">
                    Charged per successful transaction.
                  </p>
                </div>

                <div className="rounded-xl border border-white/40 bg-white/30 p-4 backdrop-blur-md shadow">
                  <div className="text-sm text-slate-600">Payment processing</div>
                  <div className="mt-1 text-2xl font-bold text-slate-900">Stripe</div>
                  <p className="mt-2 text-sm text-slate-700">
                    Stripe billing fees apply based on payment method.
                  </p>
                </div>

                <div className="rounded-xl border border-white/40 bg-white/30 p-4 backdrop-blur-md shadow">
                  <div className="text-sm text-slate-600">Setup &amp; monthly</div>
                  <div className="mt-1 text-2xl font-bold text-slate-900">$ 0</div>
                  <p className="mt-2 text-sm text-slate-700">
                    No setup cost. No monthly subscription.
                  </p>
                </div>
              </div>

              {/* Example box */}
              <div className="mt-6 rounded-xl border border-white/40 bg-white/30 p-4 backdrop-blur-md shadow">
                <div className="text-sm font-semibold text-slate-900">Example</div>
                <p className="mt-2 text-sm text-slate-700">
                  If a fan pays $100.00 for a tier, Ekstra takes 5% ($5) + Stripe's
                  billing fee. The remainder goes to you.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-6">
                <Link
                  href="/creatorsetup"
                  className="inline-flex w-full justify-center text-slate-200 rounded-2xl bg-black border-2  px-5 py-2.5 
                  hover:bg-white/30 hover:border-black hover:text-black transition-all duration-300"
                >
                  Start earning
                </Link>
              </div>

              <p className="mt-4 text-xs text-slate-600">
                * Stripe fees vary by payment method and are subject to change per Stripe's pricing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
}
