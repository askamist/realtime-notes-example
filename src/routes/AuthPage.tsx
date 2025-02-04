import { useLocation } from 'react-router-dom';
import { SignIn, SignUp } from '@clerk/clerk-react';

export function AuthPage() {
  const location = useLocation();
  const isSignUp = location.pathname === '/sign-up';

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)]">
      <div className="w-full max-w-[400px] px-4">
        {!isSignUp ? (
          <SignIn
            fallbackRedirectUrl="/notes"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "w-full shadow-none",
              }
            }}
          />
        ) : (
          <SignUp
            fallbackRedirectUrl="/notes"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "w-full shadow-none",
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
