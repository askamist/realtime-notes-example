import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string, name: string) => Promise<void>;
  onResetClick: () => void;
  error?: string;
  isLoading: boolean;
}

export function LoginForm({ onLogin, onSignUp, onResetClick, error, isLoading }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupError, setSignupError] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setSignupError("Passwords don't match");
      return;
    }
    if (!name.trim()) {
      setSignupError("Name is required");
      return;
    }
    setSignupError('');
    await onSignUp(email, password, name.trim());
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
    setSignupError('');
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Notes App</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full" onValueChange={resetForm}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="link"
                className="w-full p-0 h-auto font-normal text-sm"
                onClick={onResetClick}
              >
                Forgot password?
              </Button>
            </div>
            <Button
              className="w-full"
              onClick={() => onLogin(email, password)}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            {(error || signupError) && (
              <p className="text-sm text-red-500 text-center">
                {signupError || error}
              </p>
            )}
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button
              className="w-full"
              onClick={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Sign Up'}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
