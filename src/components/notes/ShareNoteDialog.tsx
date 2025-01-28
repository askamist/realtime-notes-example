import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useTeams } from '@/hooks/useTeams';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@clerk/clerk-react';

interface ShareNoteDialogProps {
  noteId: string;
  isOpen: boolean;
  onClose: () => void;
  onShare: () => void;
}

export function ShareNoteDialog({ noteId, isOpen, onClose, onShare }: ShareNoteDialogProps) {
  const [email, setEmail] = useState('');
  const [access, setAccess] = useState('view');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [shareType, setShareType] = useState<'user' | 'team'>('user');
  const { getToken } = useAuth();
  const { teams } = useTeams();

  const handleShare = async () => {
    try {
      const token = await getToken();

      if (shareType === 'user') {
        await apiClient(`/api/notes/${noteId}/share`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({ email, access }),
        });
      } else {
        await apiClient(`/api/notes/${noteId}/share-team`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({ teamId: selectedTeam }),
        });
      }

      onShare();
      onClose();
    } catch (error) {
      console.error('Failed to share note:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Note</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Select value={shareType} onValueChange={(value: 'user' | 'team') => setShareType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Share with..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">Share with User</SelectItem>
              <SelectItem value="team">Share with Team</SelectItem>
            </SelectContent>
          </Select>

          {shareType === 'user' ? (
            <>
              <Input
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Select value={access} onValueChange={setAccess}>
                <SelectTrigger>
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">View only</SelectItem>
                  <SelectItem value="edit">Can edit</SelectItem>
                </SelectContent>
              </Select>
            </>
          ) : (
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger>
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                {teams?.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleShare}>
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
