"use client"

import RevealOnScroll from "../RevealOnScroll";
import Link from "next/link";

export default function ServiceIntro() {
  return(
    <RevealOnScroll>
      <section className="py-14">
        <div className="container mx-auto grid gap-8 px-6 md:grid-cols-2">
          <div className="rounded-2xl p-6 bg-slate-200 shadow-2xl">
            <h2 className="text-2xl font-bold">For Creators</h2>
            <p className="mt-2">
              Monetize your content with memberships and recurring income.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
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
                className="inline-flex text-slate-200 rounded-2xl bg-black border-2  px-5 py-2.5 font-semibold 
                  hover:bg-slate-200 hover:border-black hover:text-black transition-all duration-300"
              >
                Start your page
              </Link>
            </div>
          </div>
          <div className="rounded-2xl p-6 bg-slate-200 shadow-2xl">
            <h2 className="text-2xl font-bold">For Fans</h2>
            <p className="mt-2">
              Support your favorite creators and unlock exclusive content.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
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
                className="inline-flex text-slate-200 rounded-2xl bg-black border-2  px-5 py-2.5 font-semibold 
                  hover:bg-slate-200 hover:border-black hover:text-black transition-all duration-300"
              >
                Browse creators
              </Link>
            </div>
          </div>
        </div>
      </section>
    </RevealOnScroll>
  )
}