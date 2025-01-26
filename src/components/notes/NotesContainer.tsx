import { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './Sidebar';
import { NotesGrid } from './NotesGrid';
import { useAuth, useUser } from "@clerk/clerk-react";
import { Note } from '@/types';
import { apiClient } from '@/lib/api-client';

export function NotesContainer() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeView, setActiveView] = useState<'personal' | 'shared'>('personal');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    if (!user) return;

    try {
      const token = await getToken();
      const data = await apiClient('/api/notes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  }, [user, getToken]);

  const handleNewNote = async () => {
    if (!user) return;

    try {
      const token = await getToken();
      const newNote = await apiClient('/api/notes', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          title: 'New Note',
          content: 'Start writing...',
        }),
      });
      setNotes(prev => [newNote, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create note');
    }
  };

  const handleEdit = async (id: string, updates: { title?: string; content?: string }) => {
    if (!user) return;

    try {
      const token = await getToken();
      const updatedNote = await apiClient(`/api/notes/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(updates),
      });
      setNotes(prev => prev.map(note =>
        note.id === id ? updatedNote : note
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update note');
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return;

    try {
      const token = await getToken();
      await apiClient(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete note');
    }
  };

  const handleShare = (id: string) => {
    // Implement note sharing later
    console.log('Sharing note:', id);
  };

  const handleSearch = (query: string) => {
    // Implement search functionality later
    console.log('Searching:', query);
  };

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user, fetchNotes]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        Please sign in to view your notes.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        Loading notes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <main className="container mx-auto py-6 flex gap-6">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        onNewNote={handleNewNote}
      />
      <NotesGrid
        notes={notes}
        activeView={activeView}
        onSearch={handleSearch}
        onEdit={handleEdit}
        onShare={handleShare}
        onDelete={handleDelete}
      />
    </main>
  );
}
