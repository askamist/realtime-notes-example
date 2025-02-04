import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { apiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Note } from '@/types';
import { CollaborativeEditor } from '@/components/editor/CollaborativeEditor';
import { RoomProvider as LiveblocksRoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from '@liveblocks/react';
import { ErrorBoundary } from 'react-error-boundary';

export function EditNotePage() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNote() {
      try {
        const token = await getToken();
        const fetchedNote = await apiClient(`/api/notes/${noteId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNote(fetchedNote);
        setTitle(fetchedNote.title);
        setContent(fetchedNote.content);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch note');
      } finally {
        setLoading(false);
      }
    }

    if (noteId) {
      fetchNote();
    }
  }, [noteId, getToken]);

  const handleSave = async () => {
    try {
      const token = await getToken();
      await apiClient(`/api/notes/${noteId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, content }),
      });
      navigate('/notes');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save note');
    }
  };

  if (loading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8 text-red-500">Error: {error}</div>;
  }

  if (!note) {
    return <div className="container mx-auto py-8">Note not found</div>;
  }

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Edit Note</h1>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => navigate('/notes')}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>

        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="text-lg"
        />

        <div className="min-h-[400px]">
          <ErrorBoundary fallback={<div>Error</div>}>
            <LiveblocksRoomProvider id={`notes/${noteId}`}>
              <ClientSideSuspense fallback={<div>Loading…</div>}>
                <CollaborativeEditor
                  initialContent={content}
                  onChange={setContent}
                />
              </ClientSideSuspense>
            </LiveblocksRoomProvider>
          </ErrorBoundary>
        </div>
      </div>
    </div >
  );
}

