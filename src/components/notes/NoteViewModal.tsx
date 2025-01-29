import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Note } from "@/types";
import { Badge } from "../ui/badge";
import { Share2Icon } from "lucide-react";

interface NoteViewModalProps {
  note: Note | null;
  isOpen: boolean;
  onClose: () => void;
  isShared: boolean;
}

export function NoteViewModal({ note, isOpen, onClose, isShared }: NoteViewModalProps) {
  if (!note) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between gap-2">
            <DialogTitle className="text-xl">{note.title}</DialogTitle>
            {isShared && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Share2Icon className="h-3 w-3" />
                Shared
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-4 overflow-y-auto pr-6 max-h-[calc(90vh-8rem)]">
          <div
            className="prose prose-sm dark:prose-invert max-w-none break-words overflow-x-hidden"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />

          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-4">
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
