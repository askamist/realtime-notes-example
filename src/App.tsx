import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { HomePage } from "./routes/HomePage";
import { TeamsPage } from "./routes/TeamsPage";
import { AuthPage } from "./routes/AuthPage";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "./components/theme/theme-provider";
import { TeamPage } from "./routes/TeamPage";

function App() {
  const { user } = useUser();
  const userData = user ? { name: user.firstName || 'User' } : null;

  return (
    <ThemeProvider>
      <SignedIn>
        <Navbar user={userData} />
        <Routes>
          <Route path="/" element={<HomePage />} />
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
    </ThemeProvider>
  );
}

export default App;
