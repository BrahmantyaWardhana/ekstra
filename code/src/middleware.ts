import { auth } from "~/server/auth";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const USER_ROUTES = ["/user/"]
const CREATOR_ROUTES = ["/creator/"]


export async function middleware(request: NextRequest) {
  const { nextUrl } = request
  const pathname = nextUrl.pathname; 
  
  const session = await auth()
  const isAuthenticated = !!session?.user
  const isCreator = !!session?.user.creatorPageId

  const isNotPublicRoute = USER_ROUTES.some((route: any) => pathname.startsWith(route));
  const isCreatorRoute = CREATOR_ROUTES.some((route: any) => pathname.startsWith(route));

  if (!isAuthenticated && isNotPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl))
  }

  if (isCreatorRoute && !isCreator) {
    return NextResponse.redirect(new URL("/creatorsetup/", nextUrl));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
