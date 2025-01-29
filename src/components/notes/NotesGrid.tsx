import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { TagsFilter } from './TagsFilter'
import { Badge } from "@/components/ui/badge"
import { Note } from "@/types"
import { Share2Icon, PlusIcon, Loader2 } from "lucide-react"
import { NoteViewModal } from './NoteViewModal'

interface NotesGridProps {
  notes: Note[];
  sharedNotes: Note[];
  onSearch: (query: string) => void;
  onShare: (id: string) => void;
  onDelete: (id: string) => void;
  onAnalyzeTags: (id: string) => void;
  onNewNote: () => Promise<void>;
}

export function NotesGrid({
  notes,
  sharedNotes,
  onSearch,
  onShare,
  onDelete,
  onAnalyzeTags,
  onNewNote
}: NotesGridProps) {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Combine and sort all notes by updatedAt
  const allNotes = [...notes, ...sharedNotes].sort((a, b) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  // Get unique tags from all notes
  const allTags = Array.from(new Set(
    allNotes.flatMap(note => note.tags.map(t => t.tag))
  ));

  // Filter notes based on selected tags
  const filteredNotes = selectedTags.length > 0
    ? allNotes.filter(note =>
      note.tags.some(t => selectedTags.includes(t.tag.id))
    )
    : allNotes;

  const handleTagSelect = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const isSharedNote = (noteId: string) =>
    sharedNotes.some(note => note.id === noteId);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleCreateNote = async () => {
    setIsCreating(true);
    try {
      await onNewNote();
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <section className="flex-1">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold">My Notes</h2>
            <Button
              onClick={handleCreateNote}
              size="sm"
              className="flex items-center gap-2"
              disabled={isCreating}
            >
              {isCreating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <PlusIcon className="h-4 w-4" />
              )}
              {isCreating ? "Creating..." : "Create Note"}
            </Button>
          </div>
          <Input
            type="search"
            placeholder="Search notes..."
            className="w-64"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <TagsFilter
          tags={allTags}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  No notes yet. Create your first note!
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`border rounded-lg p-4 space-y-2 cursor-pointer hover:border-primary/50 transition-colors ${isSharedNote(note.id) ? 'border-blue-500/50' : ''
                  }`}
                onClick={() => handleNoteClick(note)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{note.title}</h3>
                  {isSharedNote(note.id) && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Share2Icon className="h-3 w-3" />
                      Shared
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-gray-600 line-clamp-3">{note.content}</p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {note.tags.map(({ tag }) => (
                    <Badge
                      key={tag.id}
                      style={{
                        backgroundColor: tag.color,
                        color: 'white',
                      }}
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAnalyzeTags(note.id)}
                  >
                    Analyze Tags
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/notes/${note.id}/edit`)}
                  >
                    Edit
                  </Button>
                  {!isSharedNote(note.id) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onShare(note.id)}
                    >
                      Share
                    </Button>
                  )}
                  {!isSharedNote(note.id) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(note.id)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <NoteViewModal
        note={selectedNote}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isShared={selectedNote ? isSharedNote(selectedNote.id) : false}
      />
    </section>
  );
}
