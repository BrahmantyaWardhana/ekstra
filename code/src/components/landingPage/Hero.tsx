export default function Hero() {
  return(
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-6 pt-16 pb-24 text-center">
        <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
          Earn{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-300">
            Ekstra
          </span>
          {" "} with us.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300 md:text-xl">
          Ekstra lets you create a page, lock posts behind memberships,
          and get paid monthly. Simple for you. Special for your fans.
        </p>

        {/* Credibility strip */}
        <div className="mt-10 text-xs text-slate-400">
          No setup fees • Cancel anytime • Keep ownership of your content
        </div>
      </div>
    </section>
  )
}