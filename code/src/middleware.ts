import { auth } from "~/server/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const creatorPageId = req.auth?.user?.creatorPageId ?? null;

  const publicRoutes = ['/', '/login', '/about', '/gettingstarted'];
  const creatorRoutes = ['/creator', '/creator/*'];
  const creatorSetupRoute = '/creatorsetup';

  const isPublicRoute = publicRoutes.includes(pathname);
  const isCreatorRoute = creatorRoutes.some(route =>
    pathname.startsWith(route.replace('/*', ''))
  );
  const isCreatorSetup = pathname === creatorSetupRoute;

  if (isCreatorSetup) {
    if (!req.auth) {
      return Response.redirect(new URL("/login", req.nextUrl.origin));
    }
    if (creatorPageId) {
      return Response.redirect(new URL("/creator/dashboard", req.nextUrl.origin));
    }
    return;
  }

  if (isCreatorRoute) {
    if (!req.auth) {
      return Response.redirect(new URL("/login", req.nextUrl.origin));
    }
    if (creatorPageId === null) {
      return Response.redirect(new URL("/creatorsetup", req.nextUrl.origin));
    }
    return;
  }

  if (isPublicRoute) {
    if (req.auth) {
      return Response.redirect(new URL("/user/home", req.nextUrl.origin));
    }
    return;
  }

  if (!req.auth) {
    return Response.redirect(new URL("/login", req.nextUrl.origin));
  }

  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
