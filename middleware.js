import { NextResponse } from "next/server";

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.href?.split("?")?.[0]);
  requestHeaders.set("x-base_url", request.nextUrl.origin);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
