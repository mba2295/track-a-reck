export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/tickets/new", "/tickets/edit/:id+"],
};
