import { useState, useEffect, useCallback } from 'react';
import { NotesGrid } from './NotesGrid';
import { useAuth, useUser } from "@clerk/clerk-react";
import { Note } from '@/types';
import { apiClient } from '@/lib/api-client';
import { ShareNoteDialog } from './ShareNoteDialog';
import { useNavigate } from 'react-router-dom';

export function NotesContainer() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [sharedNotes, setSharedNotes] = useState<Note[]>([]);
  const navigate = useNavigate();

  const fetchAllNotes = useCallback(async () => {
    if (!user) return;

    try {
      const token = await getToken();
      const [personalNotes, shared] = await Promise.all([
        apiClient('/api/notes', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        apiClient('/api/notes/shared', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setNotes(personalNotes);
      setSharedNotes(shared);
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
      const newNote = await apiClient("/api/notes", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          title: "New Note",
          content: "Start writing...",
          tags: [],
        }),
      });
      await fetchAllNotes();
      navigate(`/notes/${newNote.id}/edit`);
    } catch (error) {
      console.error("Failed to create note:", error);
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

  const handleShare = (noteId: string) => {
    setSelectedNoteId(noteId);
    setShareDialogOpen(true);
  };

  const handleSearch = (query: string) => {
    // Implement search functionality later
    console.log('Searching:', query);
  };

  const handleAnalyzeTags = async (noteId: string) => {
    if (!user) return;

    try {
      const token = await getToken();
      await apiClient(`/api/notes/${noteId}/analyze-tags`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      // Refresh notes to get updated tags
      fetchAllNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze tags');
    }
  };

  useEffect(() => {
    if (user) {
      fetchAllNotes();
    }
  }, [user, fetchAllNotes]);

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
    <main className="container mx-auto py-6">
      <NotesGrid
        notes={notes}
        sharedNotes={sharedNotes}
        onSearch={handleSearch}
        onShare={handleShare}
        onDelete={handleDelete}
        onAnalyzeTags={handleAnalyzeTags}
        onNewNote={handleNewNote}
      />
      {selectedNoteId && (
        <ShareNoteDialog
          noteId={selectedNoteId}
          isOpen={shareDialogOpen}
          onClose={() => {
            setShareDialogOpen(false);
            setSelectedNoteId(null);
          }}
          onShare={() => {
            fetchAllNotes();
          }}
        />
      )}
    </main>
  );
}
