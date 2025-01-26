import { useState } from 'react'
import './App.css'
import { useAuth } from './hooks/useAuth'
import { LoginForm } from './components/auth/LoginForm'
import { ResetPasswordModal } from './components/auth/ResetPasswordModal'
import { ThemeProvider } from './components/theme/theme-provider'
import { Navbar } from './components/layout/Navbar'
import { NotesContainer } from './components/notes/NotesContainer'


function App() {
  const { isLoggedIn, currentUser, error, isLoading, login, signup, logout, resetPassword } = useAuth();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  if (!isLoggedIn) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Navbar user={null} onLogout={() => { }} />
          <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
            <div className="w-full max-w-[400px] px-4">
              <LoginForm
                onLogin={login}
                onSignUp={signup}
                onResetClick={() => setIsResetModalOpen(true)}
                error={error}
                isLoading={isLoading}
              />
              {isResetModalOpen && (
                <ResetPasswordModal
                  onReset={resetPassword}
                  onClose={() => setIsResetModalOpen(false)}
                  error={error}
                  isLoading={isLoading}
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
        <Navbar user={currentUser} onLogout={logout} />
        <NotesContainer />
      </div>
    </ThemeProvider>
  );
}

export default App
