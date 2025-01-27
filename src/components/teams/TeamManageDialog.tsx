import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/clerk-react";
import { apiClient } from "@/lib/api-client";

interface TeamMember {
  id: string;
  email: string;
  role: string;
}

interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  ownerId: string;
}

interface TeamManageDialogProps {
  team: Team;
  isOpen: boolean;
  onClose: () => void;
  onTeamUpdated: () => void;
}

export function TeamManageDialog({ team, isOpen, onClose, onTeamUpdated }: TeamManageDialogProps) {
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const { getToken } = useAuth();

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getToken();
      await apiClient(`/api/teams/${team.id}/members`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email: newMemberEmail }),
      });
      setNewMemberEmail("");
      onTeamUpdated();
    } catch (error) {
      console.error("Failed to add team member:", error);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      const token = await getToken();
      await apiClient(`/api/teams/${team.id}/members/${memberId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      onTeamUpdated();
    } catch (error) {
      console.error("Failed to remove team member:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Team: {team.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <form onSubmit={handleAddMember} className="flex gap-2">
            <Input
              placeholder="member@example.com"
              type="email"
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
            />
            <Button type="submit">Add</Button>
          </form>
          <div className="space-y-2">
            {team.members.map((member) => (
              <div
                key={member.id}
                className="flex justify-between items-center p-2 border rounded"
              >
                <div>
                  <p>{member.email}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
                {member.role !== "owner" && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveMember(member.id)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
