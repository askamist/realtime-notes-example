import { UserButton } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { Link } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "../theme/theme-provider"

interface NavbarProps {
  user: { name: string } | null;
}

export function Navbar({ user }: NavbarProps) {
  const { setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/#/" className="text-2xl font-bold hover:opacity-80">
              Notes App
            </Link>
            <nav className="flex gap-4">
              <Link to="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link to="/notes" className="text-sm font-medium hover:text-primary">
                Notes
              </Link>
              <Link to="/teams" className="text-sm font-medium hover:text-primary">
                Teams
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {user && (
              <span className="text-sm hidden md:block">
                Welcome, {user.name}
              </span>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {user && <UserButton />}
          </div>
        </div>
      </div>
    </header>
  )
}
