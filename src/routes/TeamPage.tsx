import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Shield } from "lucide-react";
import { teamsApi } from "@/lib/api/teams";
import { Team } from "@/types";

export function TeamPage() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const { getToken, userId } = useAuth();
  const [team, setTeam] = useState<Team | null>(null);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isOwner = team?.ownerId === userId;

  useEffect(() => {
    if (!teamId) return;
    fetchTeam();
  }, [teamId]);

  const fetchTeam = async () => {
    try {
      const token = await getToken();
      if (!token || !teamId) return;
      const data = await teamsApi.getTeam(teamId, token);
      setTeam(data);
    } catch (error) {
      console.error("Failed to fetch team:", error);
      setError("Failed to load team");
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOwner) return;

    try {
      const token = await getToken();
      if (!token || !teamId) return;
      await teamsApi.addMember(teamId, newMemberEmail, token);
      setNewMemberEmail("");
      fetchTeam();
    } catch (error) {
      console.error("Failed to add team member:", error);
      setError("Failed to add member");
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!isOwner) return;

    try {
      const token = await getToken();
      if (!token || !teamId) return;
      await teamsApi.removeMember(teamId, memberId, token);
      fetchTeam();
    } catch (error) {
      console.error("Failed to remove team member:", error);
      setError("Failed to remove member");
    }
  };

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="container mx-auto py-8">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => navigate("/teams")}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Teams
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold">{team.name}</h1>
            {isOwner && <Shield className="h-5 w-5 text-primary" />}
          </div>
          <p className="text-muted-foreground">
            {isOwner ? "Manage team members and permissions" : "Team members"}
          </p>
        </div>

        {isOwner && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Add Member</h2>
            <form onSubmit={handleAddMember} className="flex gap-2">
              <Input
                placeholder="member@example.com"
                type="email"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                className="max-w-md"
              />
              <Button type="submit">Add</Button>
            </form>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Team Members</h2>
          <div className="space-y-2">
            {team.members.map((member) => (
              <div
                key={member.id}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div>
                  <p>{member.email}</p>
                  <p className="text-sm text-muted-foreground">
                    {member.role}
                  </p>
                </div>
                {isOwner && member.role !== "owner" && (
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
      </div>
    </div>
  );
}
