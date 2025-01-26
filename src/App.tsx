import { SignIn, SignUp } from "@clerk/clerk-react";
import { useAuth } from './hooks/useAuth';
import { ThemeProvider } from './components/theme/theme-provider';
import { Navbar } from './components/layout/Navbar';
import { NotesContainer } from './components/notes/NotesContainer';
import { useState } from 'react';

function App() {
  const { isLoggedIn, currentUser } = useAuth();
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');

  if (!isLoggedIn) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Navbar user={null} />
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)]">
            <div className="w-full max-w-[400px] px-4">
              <div className="mb-4 flex justify-center gap-4">
                <button
                  className={`px-4 py-2 ${authView === 'login' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
                  onClick={() => setAuthView('login')}
                >
                  Sign In
                </button>
                <button
                  className={`px-4 py-2 ${authView === 'signup' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
                  onClick={() => setAuthView('signup')}
                >
                  Sign Up
                </button>
              </div>
              {authView === 'login' ? (
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
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navbar user={currentUser} />
        <NotesContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
