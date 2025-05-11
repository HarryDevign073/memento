import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

import { TOKEN_KEY } from "./constants/key";
import { URLS } from "./constants/urls";

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};

export async function middleware(request: NextRequest) {
	const publicRoutes = [URLS.AUTH.SIGN_IN, URLS.AUTH.SIGN_UP];
	const token = (await cookies()).get(TOKEN_KEY);
	const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

	// If on public route with token, redirect to home
	if (token && isPublicRoute) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	// If on private route without token, redirect to sign in
	if (!token && !isPublicRoute) {
		return NextResponse.redirect(new URL(URLS.AUTH.SIGN_IN, request.url));
	}

	return NextResponse.next();
}