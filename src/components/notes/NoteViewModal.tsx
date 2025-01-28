import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Note } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Share2Icon } from "lucide-react";

interface NoteViewModalProps {
  note: Note | null;
  isOpen: boolean;
  onClose: () => void;
  isShared?: boolean;
}

export function NoteViewModal({ note, isOpen, onClose, isShared }: NoteViewModalProps) {
  if (!note) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-xl font-semibold">{note.title}</DialogTitle>
            {isShared && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Share2Icon className="h-3 w-3" />
                Shared
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />

          <div className="flex flex-wrap gap-1 pt-4 border-t">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
