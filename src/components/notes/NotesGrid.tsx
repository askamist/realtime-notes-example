import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Note } from "@/types"
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

interface NotesGridProps {
  notes: Note[];
  activeView: 'personal' | 'shared';
  onSearch: (query: string) => void;
  onShare: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotesGrid({ notes, activeView, onSearch, onShare, onDelete }: NotesGridProps) {
  const navigate = useNavigate();

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
          notes.map((note) => (
            <div key={note.id} className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold">{note.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{note.content}</p>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/notes/${note.id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onShare(note.id)}
                >
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(note.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
