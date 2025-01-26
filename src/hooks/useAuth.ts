import { useUser, useClerk } from "@clerk/clerk-react";

export function useAuth() {
  const { user, isLoaded: userLoaded } = useUser();
  const { signOut } = useClerk();

  return {
    isLoggedIn: !!user,
    currentUser: user
      ? {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress || "",
          name:
            user.fullName ||
            user.firstName ||
            user.primaryEmailAddress?.emailAddress ||
            "",
        }
      : null,
    isLoading: !userLoaded,
    logout: () => signOut(),
  };
}
