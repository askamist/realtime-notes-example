import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../theme/theme-provider";
import { useAuth } from "@/hooks/useAuth";

export function Layout() {
  const { currentUser } = useAuth();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navbar user={currentUser} />
        <Outlet />
      </div>
    </ThemeProvider>
  );
}
