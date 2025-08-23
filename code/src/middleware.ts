import { auth } from "~/server/auth";

export default auth((req) => {
  const { pathname, origin } = req.nextUrl;
  const creatorPageId = req.auth?.user?.creatorPageId ?? null;

  // helpers
  const segMatch = (base: string) => pathname === base || pathname.startsWith(`${base}/`);

  // route buckets
  const isPublicRoute = ['/'].includes(pathname);
  const isCreatorRoute = segMatch('/creator');
  const isCreatorSetup = pathname === '/creatorsetup';
  const isCreatorPageRoute = segMatch('/creatorpage');

  
  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
