import { SignIn, SignUp } from "@clerk/clerk-react";
import { useNavigate, useLocation } from 'react-router-dom';

export function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignUp = location.hash === '#signup';

  const handleTabChange = (isSignUpTab: boolean) => {
    navigate(isSignUpTab ? '/#signup' : '/#login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)]">
      <div className="w-full max-w-[400px] px-4">
        <div className="mb-4 flex justify-center gap-4">
          <button
            className={`px-4 py-2 ${!isSignUp ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => handleTabChange(false)}
          >
            Sign In
          </button>
          <button
            className={`px-4 py-2 ${isSignUp ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => handleTabChange(true)}
          >
            Sign Up
          </button>
        </div>
        {!isSignUp ? (
          <SignIn
            routing="hash"
            signUpUrl="#signup"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "w-full shadow-none",
              }
            }}
          />
        ) : (
          <SignUp
            routing="hash"
            signInUrl="#login"
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
