import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

import { ADMIN_DINAS, DOMAIN } from "./constants";
import { AccessTokenClaim } from "./types/jwt";

export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/login")) {
    if (req.cookies.has("access_token") && req.cookies.get("access_token")?.value !== "") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }
  if (!req.cookies.has("access_token") || req.cookies.get("access_token")?.value === "") {
    req.cookies.delete("access_token");
    return NextResponse.redirect(new URL("/login", req.url));
  }else{
    const claim: AccessTokenClaim = jwtDecode(req.cookies.get("access_token")?.value ?? "");
    if (claim.role_name != ADMIN_DINAS) {
      const url = `${claim.subdomain}.${DOMAIN}`
      console.log(new Date())
      console.log(DOMAIN)
      console.log(url)
      return NextResponse.redirect(new URL(`${req.nextUrl.pathname}${req.nextUrl.search}`, `http://${url}`));
    }
  }
  return NextResponse.next();

}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|registrasi).*)"],
};
