import { auth } from "~/server/auth";

export default auth((req) => {
  const { pathname, origin } = req.nextUrl;
  const creatorPageId = req.auth?.user?.creatorPageId ?? null;

  // helpers
  const segMatch = (base: string) => pathname === base || pathname.startsWith(`${base}/`);

  // route buckets
  const isPublicRoute = ['/', '/login', '/about', '/gettingstarted'].includes(pathname);
  const isCreatorRoute = segMatch('/creator');
  const isCreatorSetup = pathname === '/creatorsetup';
  const isCreatorPageRoute = segMatch('/creatorpage');

  if (isCreatorSetup) {
    if (!req.auth) return Response.redirect(new URL("/login", origin));
    if (creatorPageId) return Response.redirect(new URL("/creator/dashboard", origin));
    return;
  }

  if (isCreatorRoute) {
    if (!req.auth) return Response.redirect(new URL("/login", origin));
    if (!creatorPageId) return Response.redirect(new URL("/creatorsetup", origin));
    return;
  }

  if (isCreatorPageRoute) {
    if (!req.auth) return Response.redirect(new URL("/login", origin));
    return;
  }

  // Public routes
  if (isPublicRoute) {
    if (req.auth) return Response.redirect(new URL("/user/home", origin));
    return;
  }

  // Everything else requires auth
  if (!req.auth) return Response.redirect(new URL("/login", origin));

  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
