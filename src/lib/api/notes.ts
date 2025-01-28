import { Note } from "@/types";
import { apiClient } from "../api-client";

export const notesApi = {
  getNotes: async (token: string): Promise<Note[]> => {
    return apiClient("/api/notes", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  createNote: async (
    data: { title: string; content: string },
    token: string
  ): Promise<Note> => {
    return apiClient("/api/notes", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  },

  updateNote: async (
    id: string,
    updates: { title?: string; content?: string },
    token: string
  ): Promise<Note> => {
    return apiClient(`/api/notes/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(updates),
    });
  },

  deleteNote: async (id: string, token: string): Promise<void> => {
    return apiClient(`/api/notes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
