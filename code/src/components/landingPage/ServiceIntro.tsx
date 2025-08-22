import Link from "next/link";

export default function ServiceIntro() {
  return(
    <section className="border-y border-white/5 bg-white/5 py-14">
      <div className="container mx-auto grid gap-8 px-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold">For Creators</h2>
          <p className="mt-2 text-slate-300">
            Monetize your content with memberships and recurring income.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block size-2 rounded-full bg-emerald-400" />
              Create a page in minutes
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block size-2 rounded-full bg-emerald-400" />
              Post text, images, audio, and video*
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block size-2 rounded-full bg-emerald-400" />
              Lock posts behind tiers
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block size-2 rounded-full bg-emerald-400" />
              Get paid monthly
            </li>
          </ul>
          <div className="mt-6">
            <Link
              href="/creator/onboarding"
              className="inline-flex rounded-xl bg-white px-5 py-2.5 font-semibold text-slate-900 transition hover:brightness-95"
            >
              Start your page
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold">For Fans</h2>
          <p className="mt-2 text-slate-300">
            Support your favorite creators and unlock exclusive content.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block size-2 rounded-full bg-sky-400" />
              Join a membership tier
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block size-2 rounded-full bg-sky-400" />
              Access locked posts & perks
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block size-2 rounded-full bg-sky-400" />
              Cancel anytime
            </li>
          </ul>
          <div className="mt-6">
            <Link
              href="/user/explore"
              className="inline-flex rounded-xl bg-white px-5 py-2.5 font-semibold text-slate-900 transition hover:brightness-95"
            >
              Browse creators
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}