import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define las rutas protegidas
const isProtectedRoute = createRouteMatcher(["/settings(.*)", "/", "/inbox"]);

export default clerkMiddleware(async (auth, req) => {
  // Protege las rutas definidas
  if (isProtectedRoute(req)) {
    await auth().protect();
  }
});

export const config = {
  // Aplica el middleware en todas las rutas excepto para archivos estáticos y rutas _next
  matcher: ["/((?!.*\\..*|_next|static).*)", "/", "/(api|trpc)(.*)"],
};
