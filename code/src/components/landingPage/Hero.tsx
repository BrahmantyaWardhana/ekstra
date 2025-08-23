"use client"

import RevealOnScroll from "../RevealOnScroll";

export default function Hero() {
  return(
    <RevealOnScroll>
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 pt-16 pb-24 text-center">
          <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
            Earn{" "}
          <span className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Ekstra
          </span>

            {" "} with us.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-black md:text-xl">
            Ekstra lets you create a page, lock posts behind memberships,
            and get paid monthly. Simple for you. Special for your fans.
          </p>

          {/* Credibility strip */}
          <div className="mt-10 text-xs text-black">
            No setup fees • Cancel anytime • Keep ownership of your content
          </div>
        </div>
      </section>
    </RevealOnScroll>
  )
}