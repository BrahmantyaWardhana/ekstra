import { redirect } from "next/navigation";
import { Suspense } from "react";
import GoogleLogin from "~/components/GoogleLogin";
import { auth } from "~/server/auth";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect(`/user/home`);

  return (
    <Suspense fallback={<div />}>
      <GoogleLogin />
    </Suspense>
  );
}
