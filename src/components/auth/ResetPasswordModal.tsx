import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ResetPasswordModalProps {
  onReset: (email: string) => Promise<boolean>;
  onClose: () => void;
  error?: string;
  isLoading: boolean;
}

export function ResetPasswordModal({ onReset, onClose, error, isLoading }: ResetPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const handleReset = async () => {
    await onReset(email);
    setResetMessage('Password reset email sent! Check your inbox.');
    setEmail('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-xl">Reset Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}
          {resetMessage && (
            <p className="text-sm text-green-500 text-center">{resetMessage}</p>
          )}
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full"
            onClick={handleReset}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>
          <Button
            className="w-full"
            variant="ghost"
            onClick={onClose}
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
