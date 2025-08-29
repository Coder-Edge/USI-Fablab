// middleware.ts à la racine du projet

import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { accessControl } from "@/app/accessControl";

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const token = req.cookies.get("jwt")?.value;


  if (!token) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret)
    const userToken = payload;

    const allowedRoles = accessControl[url.pathname];

    if (allowedRoles && !allowedRoles.includes(userToken.role as string)) {
      url.pathname = "/error/unauthorized";
      return NextResponse.redirect(url);
    }

    // Vérifie si le rôle dans l'URL correspond au rôle du token
    if (url.searchParams.get("role") !== userToken.role) {
      url.searchParams.set("role", userToken.role as string);

      return NextResponse.redirect(url);
    }

  } catch (error) {
    console.log(error);
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", "/pages/:path*"
  ],
};
