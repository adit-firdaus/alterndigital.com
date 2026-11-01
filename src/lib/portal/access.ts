export function isStaff(user: { collection?: string } | null | undefined): boolean {
  return user?.collection === "users";
}

export const staffOnly = ({ req }: { req: { user?: { collection?: string } | null } }) => isStaff(req.user);
