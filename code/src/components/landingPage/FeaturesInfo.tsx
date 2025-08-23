"use client"

import RevealOnScroll from "../RevealOnScroll";

export default function FeaturesInfo() {
  return(
    <RevealOnScroll>
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Everything you need to start earning Ekstra
            </h2>
            <p className="mt-3 text-slate-800">
              Start simple. Grow as you go. Ekstra focuses on what creators
              use daily.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Membership tiers",
                desc: "Offer multiple levels with different perks and pricing.",
              },
              {
                title: "Locked posts",
                desc: "Paywall any post so only members can view.",
              },
              {
                title: "Creator page",
                desc: "A clean hub for your story, posts, and membership tiers.",
              },
              {
                title: "Payments",
                desc: "Recurring subscriptions handled securely.*",
              },
              {
                title: "Analytics (coming soon)",
                desc: "Track members, revenue, and post performance.",
              },
              {
                title: "Messages (coming soon)",
                desc: "Talk to your members and build community.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-white/10 bg-slate-200 p-6"
              >
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="size-5"
                    aria-hidden
                  >
                    <path d="M12 2v20M2 12h20" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </RevealOnScroll>
  )
}