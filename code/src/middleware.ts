import { auth } from "~/server/auth";

export default auth((req) => {
  const { pathname, origin } = req.nextUrl;
  const creatorPageId = req.auth?.user?.creatorPageId ?? null;

  // helpers
  const segMatch = (base: string) => pathname === base || pathname.startsWith(`${base}/`);

  // route buckets
  const isCreatorRoute = segMatch('/creator');
  
  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
