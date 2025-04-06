import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { auth } from "~/lib/auth";
import { getSessionCookie } from "better-auth/cookies";
// import { updateSession } from "~/lib/supabase/middleware";

// export async function middleware(request: NextRequest) {
//   return await updateSession(request);
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * Feel free to modify this pattern to include more paths.
//      */
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//   ],
// };


// import { clerkMiddleware } from '@clerk/nextjs/server'

// export default clerkMiddleware()

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// }

export async function middleware(request: NextRequest) {
  // Check if the request is for a protected route
  if (request.nextUrl.pathname.startsWith('/protected')) {
    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // // Get the session token from the cookies
    // const session = await auth.api.getSession({ headers: await headers() });
    // console.log("session", session);
    // // If there's no session, redirect to login
    // if (!session) {
    //   const loginUrl = new URL('/login', request.url);
    //   // Add the original URL as a redirect parameter
    //   loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    //   return NextResponse.redirect(loginUrl);
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Only run middleware on protected routes
    '/protected/:path*',
  ],
};