import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie:
      process.env.NEXTAUTH_URL?.startsWith("https://") ??
      !!process.env.VERCEL_URL,
  });

  const { pathname } = req.nextUrl;

  //Allow request if the following is true...
  //1) its a request for next-auth session & provider fetching
  //2) the token exists
  if (pathname.includes("/api/auth") || token) {
    //proceed to the Home Page
    console.log("ACCESS TOKEN IS VALID");
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  //Redirect to login if they dont have a token
  if (!token && pathname !== "/login") {
    console.log("NO ACCESS TOKEN FOUND");
    url.pathname = "/login";
    console.log("Redirecting...");
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: "/",
};
