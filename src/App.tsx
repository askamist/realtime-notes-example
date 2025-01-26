import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./routes/HomePage";
import { AuthPage } from "./routes/AuthPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />

        <Route path="/auth" element={
          isLoggedIn ? <Navigate to="/" replace /> : <AuthPage />
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
