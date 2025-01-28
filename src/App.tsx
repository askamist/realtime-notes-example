import { Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { HomePage } from './routes/HomePage';
import { TeamsPage } from './routes/TeamsPage';
import { ThemeProvider } from './components/theme/theme-provider';
import { Navbar } from './components/layout/Navbar';
import { AuthPage } from './routes/AuthPage';
import { TeamPage } from './routes/TeamPage';
import { useAuth } from "./hooks/useAuth";
import { NotesPage } from './routes/NotesPage';
import { EditNotePage } from './routes/EditNotePage';

function App() {
  const { currentUser } = useAuth();

  return (
    <ThemeProvider>
      <SignedIn>
        <Navbar user={currentUser} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/notes/:noteId/edit" element={<EditNotePage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/teams/:teamId" element={<TeamPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SignedIn>

      <SignedOut>
        <Routes>
          <Route path="/sign-in" element={<AuthPage />} />
          <Route path="/sign-up" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        </Routes>
      </SignedOut>
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/notes"
          element={
            <>
              <SignedIn>
                <NotesPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/notes/:noteId/edit"
          element={
            <>
              <SignedIn>
                <EditNotePage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/teams"
          element={
            <>
              <SignedIn>
                <TeamsPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes> */}
    </ThemeProvider>
  );
}

export default App;
