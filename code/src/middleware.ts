import { auth } from "~/server/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isPublicRoute = [
    '/',
    '/login',
    '/about',
    '/gettingstarted'
  ].includes(pathname);

  if (isPublicRoute || req.auth) {
    return;
  }

  return Response.redirect(new URL("/login", req.nextUrl.origin));
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};