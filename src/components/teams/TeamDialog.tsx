import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/clerk-react";
import { apiClient } from "@/lib/api-client";

export function TeamDialog({ onTeamCreated }: { onTeamCreated: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const { getToken } = useAuth();

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getToken();
      await apiClient("/api/teams", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: teamName }),
      });
      setTeamName("");
      setIsOpen(false);
      onTeamCreated();
    } catch (error) {
      console.error("Failed to create team:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Team</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreateTeam} className="space-y-4">
          <Input
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
