/* redirect users from certain paths - would like to use this for authentication, but dont have access to the auth context on the servers side */
/*  e.g. if the path is under /manage-account dir, then redirect to the home page with the login dialog showing*/
export function middleware(req: any) {}

export const config = {
  matcher: "/:path*",
  debug: true,
  trailingSlash: true,
};
