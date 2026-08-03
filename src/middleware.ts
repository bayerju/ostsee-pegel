import { NextResponse, type NextRequest } from "next/server";
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
  let response: NextResponse;

  // Check if the request is for a protected route
  if (request.nextUrl.pathname.startsWith("/protected")) {
    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
      response = NextResponse.redirect(new URL("/login", request.url));
    } else {
      response = NextResponse.next();
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
  } else {
    response = NextResponse.next();
  }

  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0];
  const hostname =
    forwardedHost?.trim().split(":")[0] ??
    request.headers.get("host")?.split(":")[0] ??
    request.nextUrl.hostname;
  const isPreviewSubdomain =
    hostname.endsWith(".ostsee-pegel.de") && hostname !== "www.ostsee-pegel.de";

  if (isPreviewSubdomain) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: [
    // Protect account pages and keep deployment subdomains out of search results.
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
