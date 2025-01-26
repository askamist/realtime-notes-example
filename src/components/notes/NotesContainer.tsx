import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { NotesGrid } from './NotesGrid';
import { useUser } from "@clerk/clerk-react";

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
  const { user } = useUser();
  const [notes] = useState<Note[]>([]);
  const [activeView, setActiveView] = useState<'personal' | 'shared'>('personal');
  // const [_, setSearchQuery] = useState('');

  const handleNewNote = async () => {
    if (!user) return;
    // Implement note adding
    console.log('adding note');
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

  const handleSearch = () => {
    // setSearchQuery(query);
    // Implement search functionality
  };

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
