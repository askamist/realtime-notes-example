import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { apiClient } from "@/lib/api-client";

export interface Team {
  id: string;
  name: string;
  ownerId: string;
  members: Array<{
    id: string;
    userId: string;
    email: string;
    role: string;
  }>;
}

interface TeamsResponse {
  ownedTeams: Team[];
  memberTeams: Team[];
}

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    async function fetchTeams() {
      try {
        setLoading(true);
        const token = await getToken();
        const response = await apiClient<TeamsResponse>("/api/teams", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeams([...response.ownedTeams, ...response.memberTeams]);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch teams");
        setTeams([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, [getToken]);

  const refreshTeams = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await apiClient<TeamsResponse>("/api/teams", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeams([...response.ownedTeams, ...response.memberTeams]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch teams");
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    teams,
    loading,
    error,
    refreshTeams,
    ownedTeams: teams.filter((team) =>
      team.members.some((m) => m.role === "owner")
    ),
    memberTeams: teams.filter((team) =>
      team.members.every((m) => m.role !== "owner")
    ),
  };
}
