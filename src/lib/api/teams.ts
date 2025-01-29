import { Team, TeamMember } from "@/types";
import { apiClient } from "../api-client";

export const teamsApi = {
  getTeams: async (token: string) => {
    return apiClient("/api/teams", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getTeam: async (teamId: string, token: string): Promise<Team> => {
    return apiClient(`/api/teams/${teamId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  createTeam: async (name: string, token: string): Promise<Team> => {
    return apiClient("/api/teams", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name }),
    });
  },

  addMember: async (
    teamId: string,
    email: string,
    token: string
  ): Promise<TeamMember> => {
    return apiClient(`/api/teams/${teamId}/members`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ email }),
    });
  },

  removeMember: async (
    teamId: string,
    memberId: string,
    token: string
  ): Promise<void> => {
    return apiClient(`/api/teams/${teamId}/members/${memberId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
