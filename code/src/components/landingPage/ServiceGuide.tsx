"use client"

import RevealOnScroll from "../RevealOnScroll";

import Link from "next/link";

export default function ServiceGuide() {
  return(
    <RevealOnScroll>
      <section id="how" className="border-y border-white/5 bg-white/5 py-20">
        <div className="container mx-auto grid items-center gap-10 px-6 md:grid-cols-2">
          <div>
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-wider text-slate-300">
              How it works
            </span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              From setup to earnings in 3 steps
            </h2>
            <ol className="mt-6 space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex size-6 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-200">
                  1
                </span>
                Create your Ekstra page and add tiers.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex size-6 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-200">
                  2
                </span>
                Publish posts—choose which ones are members‑only.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex size-6 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-200">
                  3
                </span>
                Share your link and earn monthly from fans.
              </li>
            </ol>
            <div className="mt-8">
              <Link
                href="/creator/onboarding"
                className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:brightness-95"
              >
                Start now
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl">
            <div className="aspect-[4/3] w-full rounded-xl bg-gradient-to-br from-indigo-500/30 to-sky-500/30 grid place-content-center">
              <span className="text-sm text-slate-200">
                Membership tiers preview
              </span>
            </div>
          </div>
        </div>
      </section>
    </RevealOnScroll>
  )
}