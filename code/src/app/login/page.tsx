"use client";

import { Suspense } from "react";
import GoogleLogin from "~/components/GoogleLogin";

export default function LoginPage() {
  return (
    <Suspense fallback={<div />}>
      <GoogleLogin />
    </Suspense>
  );
}
