import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface NoteCardProps {
  note: {
    id: string;
    title: string;
    content: string;
    lastModified: Date;
  };
  onEdit: (id: string) => void;
  onShare: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onEdit, onShare, onDelete }: NoteCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {note.content.substring(0, 100)}...
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="text-sm text-muted-foreground">
          {note.lastModified.toLocaleDateString()}
        </span>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => onEdit(note.id)}>
            Edit
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onShare(note.id)}>
            Share
          </Button>
          <Button size="sm" variant="destructive" onClick={() => onDelete(note.id)}>
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
