
import { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    console.log('Proxying request:', request.url);
  
}


export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|registrasi).*)']
}