import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { apiClient } from "@/lib/api-client";
import { TeamDialog } from "./TeamDialog";
import { TeamManageDialog } from "./TeamManageDialog";
import { Button } from "@/components/ui/button";

interface TeamMember {
  id: string;
  email: string;
  role: string;
}

interface Team {
  id: string;
  name: string;
  ownerId: string;
  members: TeamMember[];
}

export function TeamList() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const { getToken } = useAuth();

  const fetchTeams = async () => {
    try {
      const token = await getToken();
      const data = await apiClient("/api/teams", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeams(data);
    } catch (error) {
      console.error("Failed to fetch teams:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [getToken]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Teams</h2>
        <TeamDialog onTeamCreated={fetchTeams} />
      </div>
      <div className="space-y-2">
        {teams.map((team) => (
          <div
            key={team.id}
            className="p-4 border rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium">{team.name}</h3>
              <p className="text-sm text-gray-500">
                {team.members.length} members
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedTeam(team)}
            >
              Manage
            </Button>
          </div>
        ))}
      </div>
      {selectedTeam && (
        <TeamManageDialog
          team={selectedTeam}
          isOpen={!!selectedTeam}
          onClose={() => setSelectedTeam(null)}
          onTeamUpdated={fetchTeams}
        />
      )}
    </div>
  );
}
