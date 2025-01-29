import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Shield } from "lucide-react";
import { Team } from "@/types";
import { teamsApi } from "@/lib/api/teams";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function TeamList() {
  const { getToken, userId } = useAuth();
  const navigate = useNavigate();
  const [ownedTeams, setOwnedTeams] = useState<Team[]>([]);
  const [memberTeams, setMemberTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const token = await getToken();
      if (!token) return;
      const data = await teamsApi.getTeams(token);
      setOwnedTeams(data.ownedTeams);
      setMemberTeams(data.memberTeams);
    } catch (error) {
      console.error("Failed to fetch teams:", error);
      setError("Failed to load teams");
    }
  };

  const TeamCard = ({ team }: { team: Team }) => (
    <Card
      className="hover:bg-accent cursor-pointer"
      onClick={() => navigate(`/teams/${team.id}`)}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {team.name}
          {team.ownerId === userId && (
            <Shield className="h-4 w-4 text-primary" />
          )}
        </CardTitle>
        <CardDescription>
          {team.members.length} member{team.members.length !== 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>
    </Card>
  );

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Teams</h1>
        <Button onClick={() => navigate("/teams/new")}>
          <Plus className="h-4 w-4 mr-2" /> New Team
        </Button>
      </div>

      {ownedTeams.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Teams You Own</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ownedTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </div>
      )}

      {memberTeams.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Teams You're In</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {memberTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </div>
      )}

      {ownedTeams.length === 0 && memberTeams.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          You don't belong to any teams yet. Create one to get started!
        </div>
      )}
    </div>
  );
}
