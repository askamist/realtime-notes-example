import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { NotesGrid } from './NotesGrid';
import { NewNoteModal } from './NewNoteModal';
import { createNote } from '@/firebase/notes';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface Note {
  id: string;
  title: string;
  content: string;
  owner: string;
  shared: boolean;
  collaborators: string[];
  lastModified: Date;
}

export function NotesContainer() {
  const { currentUser } = useAuth();
  const [notes] = useState<Note[]>([]);
  const [activeView, setActiveView] = useState<'personal' | 'shared'>('personal');
  const [_, setSearchQuery] = useState('');
  const [isNewNoteModalOpen, setIsNewNoteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewNote = async (title: string, content: string) => {
    if (!currentUser) return;

    try {
      setIsLoading(true);
      await createNote({
        title,
        content,
        owner: currentUser.id,
        shared: false,
        collaborators: [],
      });

      toast.success('Note created successfully!');
      setIsNewNoteModalOpen(false);
      // You'll want to refresh the notes list here
      // We'll implement this in the next step with real-time updates
    } catch (error) {
      console.error('Error creating note:', error);
      toast.error('Failed to create note. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    // Implement note editing
    console.log('Editing note:', id);
  };

  const handleShare = (id: string) => {
    // Implement note sharing
    console.log('Sharing note:', id);
  };

  const handleDelete = (id: string) => {
    // Implement note deletion
    console.log('Deleting note:', id);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search functionality
  };

  return (
    <main className="container mx-auto py-6 flex gap-6">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        onNewNote={() => setIsNewNoteModalOpen(true)}
      />
      <NotesGrid
        notes={notes}
        activeView={activeView}
        onSearch={handleSearch}
        onEdit={handleEdit}
        onShare={handleShare}
        onDelete={handleDelete}
      />
      <NewNoteModal
        isOpen={isNewNoteModalOpen}
        onClose={() => setIsNewNoteModalOpen(false)}
        onSubmit={handleNewNote}
        isLoading={isLoading}
      />
    </main>
  );
}
