import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { NoteCard } from "./NoteCard"
import { Note } from "@/types"

interface NotesGridProps {
  notes: Note[];
  activeView: 'personal' | 'shared';
  onSearch: (query: string) => void;
  onEdit: (id: string, updates: { title?: string; content?: string }) => void;
  onShare: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotesGrid({
  notes,
  activeView,
  onSearch,
  onEdit,
  onShare,
  onDelete
}: NotesGridProps) {
  return (
    <section className="flex-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          {activeView === 'personal' ? 'My Notes' : 'Shared Notes'}
        </h2>
        <Input
          type="search"
          placeholder="Search notes..."
          className="w-64"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No notes yet. Create your first note!
              </p>
            </CardContent>
          </Card>
        ) : (
          notes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={onEdit}
              onShare={onShare}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  );
}
