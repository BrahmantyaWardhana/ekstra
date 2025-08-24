"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function GooglePage() {
  const sp = useSearchParams();
  const callbackUrl = sp.get("callbackUrl") ?? "/user/home";
  return (
    <section>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full border-3 border-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Ekstra
          </h2>

          <div className="flex justify-center">
            <button
              onClick={() => signIn("google", { callbackUrl })}
              className="px-4 py-2 border-2 flex gap-2 border-slate-200 rounded-lg text-slate-200 hover:border-slate-500 hover:text-slate-300 hover:shadow transition duration-150 hover:cursor-pointer"
            >
              <img
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span>Login with Google</span>
            </button>
          </div>

          {/* Disclaimer*/}
          <div className="mt-10 text-xs text-slate-400">
            <p>
              By continuing with Google, Ekstra will receive your{" "}
              <strong>name</strong>, <strong>email</strong>, and{" "}
              <strong>profile photo</strong> from your Google account. We use this
              to create and personalize your account and keep you signed in. We do
              not access your contacts or post on your behalf.*
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
