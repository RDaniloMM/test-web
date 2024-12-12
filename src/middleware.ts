import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server'

// Define las rutas protegidas
const isProtectedRoute = createRouteMatcher(["/settings(.*)", "/", "/inbox"]);
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Protege las rutas definidas
  if (isProtectedRoute(req)) {
    await auth().protect();
  }
  if (isAdminRoute(req) && (await auth()).sessionClaims?.metadata?.role !== 'admin') {
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }
});

export const config = {
  // Aplica el middleware en todas las rutas excepto para archivos estáticos y rutas _next
  matcher: ["/((?!.*\\..*|_next|static).*)", "/", "/(api|trpc)(.*)"],
};
